"use strict";

// Include gulp
var gulp = require('gulp');

// Include plugins
var jasmine = require('gulp-jasmine');
var tsc = require('gulp-typescript');

// Test JS
gulp.task('jasmine-tests', function () {
    return gulp.src('tests/**/*.js')
        .pipe(jasmine({ verbose: true}));
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

// Default Task
gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('default', ['compile-Tests', 'compile-ts', 'jasmine-tests']);