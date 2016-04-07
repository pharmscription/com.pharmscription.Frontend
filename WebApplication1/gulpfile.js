/// <binding BeforeBuild='devMock-bundle' />
"use strict";

// Include gulp
var gulp = require('gulp');

// Include plugins
var jasmine = require('gulp-jasmine');
var tsc = require('gulp-typescript');
var jspm = require('gulp-jspm');
var rename = require('gulp-rename');

// Test JS
gulp.task('jasmine-tests', ['compile-tests', 'compile-ts'], function () {
    return gulp.src('tests/**/*.js')
        .pipe(jasmine({ verbose: true, includeStackTrace: true}));
});

gulp.task('compile-tests', function() {
    var tsResult = gulp.src('tests/**/*.ts')
        //.pipe(sourcemaps.init())
        .pipe(tsc({
            module: "none",
            target: "es5",
            noLib: true
        }));
    return tsResult.js.pipe(gulp.dest('./tests'));
});

gulp.task('compile-ts', function () {
    var tsResult = gulp.src('ts/**/*.ts')
        //.pipe(sourcemaps.init())
        .pipe(tsc({
            module: "none",
            target: "es5",
            noLib: true
        }));
    return tsResult.js.pipe(gulp.dest('./ts'));
});

gulp.task('dev-bundle', function () {
    return gulp.src('ts/bootstrap.ts')
        .pipe(jspm({ minify: false })) // `jspm bundle main`
    .pipe(rename('build.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('devMock-bundle', function () {
    return gulp.src('ts/bootstrapDev.ts')
        .pipe(jspm({ minify: false })) // `jspm bundle main`
    .pipe(rename('build.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('production-jspm-bundlesfx', function () {
    return gulp.src('ts/bootstrap.ts')
        .pipe(jspm({ selfExecutingBundle: true, minify: false })) // `jspm bundle-sfx main` 
        .pipe(gulp.dest('js/'));
});

gulp.task('production-bundle-app', ['jspm-bundlesfx'], function () {
    return gulp.src('./js/bootstrap.bundle.ts')
        .pipe(rename('main.js'))
        .pipe(gulp.dest('./js'));
});

// Default Task
//gulp.task('default', function () {
//    // place code for your default task here
//});

gulp.task('default', ['compile-Tests', 'compile-ts', 'jasmine-tests'], function() {
    
});