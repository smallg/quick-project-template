var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    htmlreplace = require('gulp-html-replace'),
    rev = require('gulp-rev');

var paths = {
    scripts: 'app/scripts/**/*.js',
    css: 'app/styles/*.css'
};

gulp.task('minify-js', function () {
    return gulp.src(paths.scripts)
        .pipe(concat('app.js'))
        //.pipe(gulp.dest('dist'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('tmp/app'));
});

gulp.task('minify-css', function () {
    return gulp.src(paths.css)
        .pipe(concat('app.css'))
        //.pipe(gulp.dest('dist'))
        .pipe(rename('app.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('tmp/app'));
});

gulp.task('rev', ['minify-js', 'minify-css', 'concat-third-css', 'concat-third-js'], function () {
    return gulp.src(['tmp/app/*.css', 'tmp/app/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('tmp'));
});

gulp.task('clean', function () {
    return gulp.src(['dist', 'tmp'], {read: false})
        .pipe(clean());
});

gulp.task('replace-index', ['rev'], function () {
    var revJson = require('./tmp/rev-manifest.json');
    return gulp.src('app/index.html')
        .pipe(htmlreplace({
            'app-css': revJson["app.min.css"],
            'third-css': revJson["third.min.css"],
            'app-js': revJson["app.min.js"],
            'third-js': revJson["third.min.js"]
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

gulp.task('concat-third-css', ['copy-third-css'], function () {
    return gulp.src('tmp/*.min.css')
        .pipe(concat('third.min.css'))
        .pipe(gulp.dest('tmp/app'));
});

gulp.task('concat-third-js', ['copy-third-js'], function () {
    return gulp.src(['tmp/jquery.min.js', 'tmp/bootstrap.min.js', 'tmp/angular.min.js', 'tmp/angular-route.min.js'])
        .pipe(concat('third.min.js'))
        .pipe(gulp.dest('tmp/app'));
});

gulp.task('build', ['replace-index', 'copy-views']);