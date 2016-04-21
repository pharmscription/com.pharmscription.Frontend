// Karma configuration
// Generated on Sat Apr 09 2016 16:03:11 GMT+0200 (Mitteleuropäische Sommerzeit)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jspm', 'jasmine'],


        // list of files / patterns to load in the browser


        jspm: {
            config: 'config.js',
            loadFiles: [
                'build.js',
                'tests/**/*.ts'
            ],
            serveFiles: [
                'views/**/*.html'
            ],
            useBundles: true
            //serveFiles: [
            //    'ts/**/*.js'
            //]
            //paths: {
            //    'github:*': 'client/jspm_packages/github/*',
            //    'npm:*': 'client/jspm_packages/npm/*'
            //}
        },


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
    
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'junit'],

        junitReporter: {
            outputDir: 'test-reports', // results will be saved as $outputDir/$browserName.xml 
            outputFile: 'junitresults.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile 
            suite: '', // suite will become the package name attribute in xml testsuite element 
            useBrowserName: true, // add browser name to report and classes names 
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element 
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element, 
            properties: {} // key value pair of properties to add to the <properties> section of the report 
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
}
