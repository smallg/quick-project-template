var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    htmlreplace = require('gulp-html-replace');

var paths = {
    scripts: 'app/scripts/**/*.js',
    css: 'app/styles/*.css'
};

gulp.task('minify-js', function () {
    return gulp.src(paths.scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function () {
    return gulp.src(paths.css)
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('app.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('replace-index', function () {
    return gulp.src('app/index.html')
        .pipe(htmlreplace({
            'app-css': 'app.min.css',
            'third-css': 'third.min.css',
            'app-js': 'app.min.js',
            'third-js': 'third.min.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-views', function () {
    return gulp.src('app/views/**/*.html', {base: 'app'})
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-third-css', function () {
    return gulp.src(['app/bower_components/bootstrap/dist/css/bootstrap.min.css', 'app/bower_components/bootstrap/dist/css/bootstrap-theme.css'])
        .pipe(gulp.dest('tmp'));

});
gulp.task('copy-third-js', function () {
    return gulp.src(['app/bower_components/jquery/dist/jquery.min.js', 'app/bower_components/bootstrap/dist/js/bootstrap.min.js', 'app/bower_components/angular/angular.min.js', 'app/bower_components/angular-route/angular-route.min.js'])
        .pipe(gulp.dest('tmp'));
});

gulp.task('concat-third-css', function(){
    return gulp.src('tmp/*.min.css')
        .pipe(concat('third.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('concat-third-js', function(){
    return gulp.src(['tmp/jquery.min.js', 'tmp/bootstrap.min.js', 'tmp/angular.min.js', 'tmp/angular-route.min.js'])
        .pipe(concat('third.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'minify-js', 'minify-css','copy-third-css', 'copy-third-js', 'concat-third-css', 'concat-third-js', 'replace-index', 'copy-views']);

