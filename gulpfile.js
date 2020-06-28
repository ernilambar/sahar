// Config for theme.
var rootPath  = './';
var projectURL = 'http://staging.local/';

// Gulp Nodes.
var gulp = require( 'gulp' );

var autoprefixer = require( 'gulp-autoprefixer' );
var plumber      = require( 'gulp-plumber' );
var sass         = require( 'gulp-sass' );
var sourcemaps   = require( 'gulp-sourcemaps' );

var browserSync = require( 'browser-sync' ).create();

gulp.task('scss', function () {
    return gulp.src(rootPath + 'src/sass/front/style.scss')
        .on('error', sass.logError)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer('last 4 version'))
        .pipe(sourcemaps.write(rootPath))
        .pipe(gulp.dest(rootPath));
});

gulp.task( 'watch', function() {
    browserSync.init({
        proxy: projectURL,
        open: false
    });

    // Watch SCSS files.
    gulp.watch( rootPath + 'src/sass/front/**/*.scss', gulp.series( 'scss' ) ).on('change',browserSync.reload);

    // Watch PHP files.
    gulp.watch( rootPath + '**/**/*.php' ).on('change',browserSync.reload);

    // Watch JS files.
    gulp.watch( rootPath + 'src/scripts/*.js').on('change',browserSync.reload);
});

// Tasks.
gulp.task( 'default', gulp.series('watch'));

gulp.task( 'style', gulp.series('scss'));

gulp.task( 'build', gulp.series('style'));
