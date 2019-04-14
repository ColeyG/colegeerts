const { src, dest, parallel } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');

gulp.task('hello', async function() {
    return src('styles/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('styles'))
});
