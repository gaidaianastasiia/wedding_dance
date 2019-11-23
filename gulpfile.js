let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    browserSync = require('browser-sync');


gulp.task('clean', async function () {
    del.sync('dist')
});

gulp.task('scss', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('jsBuild', function () {
    return gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

let fontName = 'icons';

gulp.task('iconfont', async () => {
    gulp.src('app/icons/*.svg')
        .pipe(iconfontCss({
            targetPath: '../scss/base/_icons.scss',
            fontPath: '../fonts/',
            fontName: fontName
        }))
        .pipe(iconfont({
            fontName: fontName,
            formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
            normalize: true,
            fontHeight: 1001
        }))
        .pipe(gulp.dest('app/fonts'));
});

gulp.task('export', function () {
    let buildHtml = gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));

    let BuildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    let BuildJs = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    let BuildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

    let BuildImg = gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('js'))
});

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('default', gulp.parallel('scss', 'js', 'browser-sync', 'watch'))
