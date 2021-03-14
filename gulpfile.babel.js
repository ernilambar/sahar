// Load Gulp.
const gulp = require( 'gulp' );

// CSS related plugins.
const sass         = require( 'gulp-dart-sass' );
const autoprefixer = require( 'gulp-autoprefixer' );

// JS related plugins.
const uglify       = require( 'gulp-uglify' );
const babelify     = require( 'babelify' );
const browserify   = require( 'browserify' );
const source       = require( 'vinyl-source-stream' );
const buffer       = require( 'vinyl-buffer' );

// Utility plugins.
const fs         = require( 'fs' );
const del        = require( 'del' );
const lec        = require( 'gulp-line-ending-corrector' );
const plumber    = require( 'gulp-plumber' );
const rename     = require( 'gulp-rename' );
const sourcemaps = require( 'gulp-sourcemaps' );
const zip        = require( 'gulp-zip' );

// Browsers related plugins.
const browserSync = require( 'browser-sync' ).create();

// Fetch package information.
const packageJSON = JSON.parse(fs.readFileSync('./package.json'));
const projectName = packageJSON.name;
const projectVersion = packageJSON.version;

// Project URL.
const projectURL = 'http://staging.local/';

// Style related variables.
const styleSRC = './src/sass/front/style.scss';
const styleURL = './';
const mapURL   = './';

// JS related variables.
const jsSRC        = './src/scripts/';
const jsFront      = 'custom.js';
const jsCustomizer = 'customizer.js';
const jsNavigation = 'navigation.js';
const jsFiles      = [ jsFront, jsCustomizer, jsNavigation ];
const jsURL        = './assets/js/';

// Image related variables.
const imgSRC = './src/images/**/*';
const imgURL = './assets/images/';

// Watch related variables.
const styleWatch = './src/sass/**/*.scss';
const jsWatch    = './src/scripts/**/*.js';
const imgWatch   = './src/images/**/*.*';
const phpWatch   = './**/**/*.php';

// Deploy files.
const deployFiles = [
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

gulp.task('scss', () => {
    return gulp.src( styleSRC )
        .on( 'error', sass.logError )
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( autoprefixer() )
        .pipe( sourcemaps.write( styleURL ) )
        .pipe( gulp.dest( styleURL ) );
});

gulp.task('scripts', ( done ) => {
	jsFiles.map( (entry) => {
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
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( gulp.dest( jsURL ) )
	});
	done();
});

gulp.task( 'images', () => {
    return gulp.src( imgSRC )
    	.pipe( plumber() )
    	.pipe( gulp.dest( imgURL ) );
});

gulp.task( 'clean:deploy', () => {
    return del( 'deploy' );
});

gulp.task( 'copy:deploy', () => {
	return gulp.src( deployFiles, { base: "." } )
	    .pipe( gulp.dest( 'deploy/' + projectName ) )
	    .pipe( zip( projectName + '.zip' ) )
	    .pipe( gulp.dest( 'deploy' ) );
});

gulp.task( 'watch', () => {
    browserSync.init({
        proxy: projectURL,
        open: false
    });

    // Watch SCSS files.
    gulp.watch( styleWatch, gulp.series( 'scss' ) ).on( 'change', browserSync.reload );

    // Watch PHP files.
    gulp.watch( phpWatch ).on( 'change', browserSync.reload );

    // Watch JS files.
    gulp.watch( jsWatch, gulp.series( 'scripts' ) ).on( 'change', browserSync.reload );
});

// Tasks.
gulp.task( 'default', gulp.series( 'watch' ) );

gulp.task( 'style', gulp.series( 'scss' ) );

gulp.task( 'build', gulp.series( 'style', 'scripts' ) );

gulp.task( 'deploy', gulp.series( 'clean:deploy', 'copy:deploy' ) );
