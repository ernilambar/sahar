// Config for theme.
var rootPath  = './';
var projectURL = 'http://staging.local/';

// Gulp Nodes.
var gulp        = require( 'gulp' ),
    gulpPlugins = require( 'gulp-load-plugins' )();

var fs = require('fs');

var pkg = JSON.parse(fs.readFileSync('./package.json'));

var browserSync = require('browser-sync').create();

var del = require('del');

// Error Handling.
var onError = function( err ) {
    console.log( 'An error occurred:', err.message );
    this.emit( 'end' );
};

gulp.task('scss', function () {
    const { autoprefixer, plumber, sass, sassGlob, sourcemaps } = gulpPlugins;
    return gulp.src(rootPath + 'src/sass/front/style.scss')
        .on('error', sass.logError)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer('last 4 version'))
        .pipe(sourcemaps.write(rootPath))
        .pipe(gulp.dest(rootPath));
});

gulp.task('rtl', function () {
	const { rename, rtlcss } = gulpPlugins;
    return gulp.src(rootPath + 'style.css')
    	.on('error', onError)
        .pipe(rtlcss())
        .pipe(rename({ suffix: '-rtl' }))
        .pipe(gulp.dest(rootPath));
});

gulp.task('scripts', function() {
    const { plumber, rename, uglify, jshint } = gulpPlugins;
    return gulp.src( [rootPath + 'src/scripts/*.js'] )
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))
        .pipe(plumber())
        .pipe(gulp.dest('assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('scripts:gf', function() {
    const { jshint } = gulpPlugins;
    return gulp.src( [rootPath + 'gulpfile.js'] )
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task( 'watch', function() {
    browserSync.init({
        proxy: projectURL,
        open: true
    });

    // Watch SCSS files.
    gulp.watch( rootPath + 'src/sass/front/**/*.scss', gulp.series( 'scss' ) ).on('change',browserSync.reload);

    // Watch PHP files.
    gulp.watch( rootPath + '**/**/*.php' ).on('change',browserSync.reload);

    // Watch JS files.
    gulp.watch( rootPath + 'src/scripts/*.js', gulp.series( 'scripts' ) ).on('change',browserSync.reload);
});

gulp.task('imagesmin', function() {
	const { imagemin, cache } = gulpPlugins;
	return gulp
		.src( rootPath + 'src/images/**/*' )
		.pipe(
			cache(
				imagemin([
					imagemin.gifsicle({ interlaced: true }),
					imagemin.mozjpeg({ progressive: true }),
					imagemin.optipng({ optimizationLevel: 3 }), // 0-7 low-high.
					imagemin.svgo({
						plugins: [ { removeViewBox: true }, { cleanupIDs: false } ]
					})
				])
			)
		)
		.pipe( gulp.dest( 'assets/images' ) );
});

gulp.task( 'clearCache', function( done ) {
	const { cache } = gulpPlugins;
	return cache.clearAll( done );
});

gulp.task('pot', function() {
	const { run } = gulpPlugins;
	return run('wpi18n makepot --domain-path=languages --exclude=vendor,deploy').exec();
});

gulp.task('language', function() {
	const { run } = gulpPlugins;
	return run('wpi18n addtextdomain').exec();
});

gulp.task('clean:deploy', function() {
    return del('deploy');
});

gulp.task('copy:deploy', function() {
	const { zip } = gulpPlugins;
	var sourceFiles = [
		'**/*',
		'!gulpfile.js',
		'!package.json',
		'!style.css.map',
		'!package-lock.json',
		'!**/src/**',
		'!**/node_modules/**',
		'!**/deploy/**'
	];

	return gulp.src(sourceFiles)
	    .pipe(gulp.dest('deploy/' + pkg.name))
	    .pipe(zip(pkg.name + '.zip'))
	    .pipe(gulp.dest('deploy'));
});

// Tasks.
gulp.task( 'default', gulp.series('watch'));

gulp.task( 'style', gulp.series('scss'));

gulp.task( 'textdomain', gulp.series('language', 'pot'));

gulp.task( 'images', gulp.series('clearCache', 'imagesmin'));

gulp.task( 'build', gulp.series('style', 'scripts', 'textdomain'));

gulp.task( 'release', gulp.series('build', 'rtl', 'images'));

gulp.task( 'deploy', gulp.series('clean:deploy', 'copy:deploy'));

gulp.task( 'postdeploy', gulp.series('clean:deploy'));
