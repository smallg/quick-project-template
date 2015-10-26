var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps');

var paths = {
    scripts: 'app/scripts/**/*.js',
    css: 'app/styles/*.css'
};

gulp.task('minify-js', function(){
    return gulp.src(paths.scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function(){
    return gulp.src(paths.css)
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('app.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('build', ['clean', 'minify-js', 'minify-css']);

