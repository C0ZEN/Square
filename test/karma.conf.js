// Karma configuration
// Generated on 2017-05-19

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/angular/angular.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
      'bower_components/moment/min/moment-with-locales.min.js',
      'bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js',
      'bower_components/scrollreveal/dist/scrollreveal.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/jquery-mousewheel/jquery.mousewheel.js',
      'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
      'bower_components/ng-scrollbars-2/dist/scrollbars.min.js',
      'bower_components/angular-uuid-service/angular-uuid-service.js',
      'bower_components/angular-elastic/elastic.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/console.style/console.style.js',
      'bower_components/chance/chance.js',
      'bower_components/cozen-lib/release/clean/main.js',
      'bower_components/cozen-lib/release/clean/template.cache.js',
      'bower_components/cozen-lib/release/clean/directives.js',
      'bower_components/humanize-duration/humanize-duration.js',
      'bower_components/angular-timer/dist/assets/js/angular-timer-all.min.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
