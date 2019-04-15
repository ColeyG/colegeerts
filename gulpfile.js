const { src, dest } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');

function styles() {
    return src('styles/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('styles'))
}

gulp.task('watch-styles', async function () {
    gulp.watch('styles/*.scss', styles);
});

gulp.task('hello', async function () {
    console.log('hello');
});

