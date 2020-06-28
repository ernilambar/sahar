// Load Gulp.
var gulp = require( 'gulp' );

// CSS related plugins.
var sass         = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );

// JS related plugins.
var uglify       = require( 'gulp-uglify' );
var babelify     = require( 'babelify' );
var browserify   = require( 'browserify' );
var source       = require( 'vinyl-source-stream' );
var buffer       = require( 'vinyl-buffer' );

// Utility plugins.
var fs         = require( 'fs' );
var del        = require( 'del' );
var lec        = require( 'gulp-line-ending-corrector' );
var plumber    = require( 'gulp-plumber' );
var rename     = require( 'gulp-rename' );
var sourcemaps = require( 'gulp-sourcemaps' );
var zip        = require( 'gulp-zip' );

// Browsers related plugins.
var browserSync = require( 'browser-sync' ).create();

// Fetch package information.
var packageJSON = JSON.parse(fs.readFileSync('./package.json'));
var projectName = packageJSON.name;
var projectVersion = packageJSON.version;

// Project URL.
var projectURL = 'http://staging.local/';

// Style related variables.
var styleSRC = './src/sass/front/style.scss';
var styleURL = './';
var mapURL   = './';

// JS related variables.
var jsSRC        = './src/scripts/';
var jsFront      = 'custom.js';
var jsCustomizer = 'customizer.js';
var jsNavigation = 'navigation.js';
var jsFiles      = [ jsFront, jsCustomizer, jsNavigation ];
var jsURL        = './assets/js/';

// Image related variables.
var imgSRC = './src/images/**/*';
var imgURL = './assets/images/';

// Watch related variables.
var styleWatch = './src/sass/**/*.scss';
var jsWatch    = './src/scripts/**/*.js';
var imgWatch   = './src/images/**/*.*';
var phpWatch   = './**/**/*.php';

// Deploy files.
var deployFiles = [
	'*.css',
	'*.php',
	'screenshot.png',
	'readme.txt',
	'assets/**',
	'inc/**',
	'languages/**',
	'template-parts/**',
	'templates/**'
];

gulp.task('scss', function () {
    return gulp.src( styleSRC )
        .on( 'error', sass.logError )
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( autoprefixer( 'last 4 version' ) )
        .pipe( sourcemaps.write( styleURL ) )
        .pipe( gulp.dest( styleURL ) );
});

gulp.task('scripts', function(done) {
	jsFiles.map( function(entry) {
		return browserify({
			entries: [jsSRC + entry]
		})
		.transform( babelify, { presets: [ '@babel/preset-env' ] } )
		.bundle()
		.pipe( source( entry ) )
		.pipe( buffer() )
		.pipe( lec() )
		.pipe( gulp.dest( jsURL ) )
		.pipe( uglify() )
		.pipe( rename( {suffix: '.min'} ) )
		.pipe( gulp.dest( jsURL ) )
	});
	done();
});

gulp.task( 'images', function() {
    return gulp.src( imgSRC )
    	.pipe( plumber() )
    	.pipe( gulp.dest( imgURL ) );
});

gulp.task( 'clean:deploy', function() {
    return del( 'deploy' );
});

gulp.task( 'copy:deploy', function() {
	return gulp.src( deployFiles, { base: "." } )
	    .pipe( gulp.dest( 'deploy/' + projectName ) )
	    .pipe( zip( projectName + '.zip' ) )
	    .pipe( gulp.dest( 'deploy' ) );
});

gulp.task( 'watch', function() {
    browserSync.init({
        proxy: projectURL,
        open: false
    });

    // Watch SCSS files.
    gulp.watch( styleWatch, gulp.series( 'scss' ) ).on('change',browserSync.reload);

    // Watch PHP files.
    gulp.watch( phpWatch ).on('change',browserSync.reload);

    // Watch JS files.
    gulp.watch( jsWatch, gulp.series( 'scripts' ) ).on('change',browserSync.reload);
});

// Tasks.
gulp.task( 'default', gulp.series( 'watch' ) );

gulp.task( 'style', gulp.series( 'scss' ) );

gulp.task( 'build', gulp.series( 'style', 'scripts' ) );

gulp.task( 'deploy', gulp.series( 'clean:deploy', 'copy:deploy' ) );
