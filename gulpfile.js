let gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  iconfont = require('gulp-iconfont'),
  iconfontCss = require('gulp-iconfont-css'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  del = require('del'),
  browserSync = require('browser-sync');

gulp.task('clean', async function() {
  del.sync('build')
});

gulp.task('scss', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 versions']
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('jsBuild', function() {
  return gulp.src('src/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "src/"
    }
  });
});

let fontName = 'icons';

gulp.task('iconfont', async () => {
    gulp.src('src/assets/icons/*.svg')
        .pipe(iconfontCss({
            targetPath: '../../scss/components/_icons.scss',
            fontPath: '../assets/fonts/',
            fontName: fontName
        }))
        .pipe(iconfont({
            fontName: fontName,
            formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
            normalize: true,
            fontHeight: 1001
        }))
        .pipe(gulp.dest('src/assets/fonts'));
});

gulp.task('export', async ()=> {
  let buildHtml = gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'));

  let BuildCss = gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('build/css'));

  let BuildJs = gulp.src('src/js/lib/*.js')
    .pipe(gulp.dest('build/js/lib'));

  let BuildFonts = gulp.src('src/assets/fonts/**/*.*')
    .pipe(gulp.dest('build/assets/fonts'));

  let BuildImg = gulp.src('src/assets/img/**/*.*')
    .pipe(gulp.dest('build/assets/img'));
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('src/*.html', gulp.parallel('html'))
  gulp.watch('src/js/*.js', gulp.parallel('js'))
});

gulp.task('build', gulp.series('clean', 'jsBuild', 'export'))

gulp.task('default', gulp.parallel('scss', 'iconfont', 'js', 'browser-sync', 'watch'))
