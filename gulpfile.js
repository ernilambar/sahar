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
var rename     = require( 'gulp-rename' );
var plumber    = require( 'gulp-plumber' );
var sourcemaps = require( 'gulp-sourcemaps' );

// Browsers related plugins.
var browserSync = require( 'browser-sync' ).create();

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
    gulp.watch( jsWatch ).on('change',browserSync.reload);
});

// Tasks.
gulp.task( 'default', gulp.series('watch'));

gulp.task( 'style', gulp.series('scss'));

gulp.task( 'build', gulp.series('style'));
