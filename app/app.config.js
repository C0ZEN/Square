(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .config(config);

    config.$inject = [
        '$locationProvider',
        '$translateProvider',
        'CONFIG',
        'CozenThemesProvider',
        'CozenConfigProvider',
        'tmhDynamicLocaleProvider',
        '$stateProvider',
        '$urlRouterProvider',
        'CozenLazyLoadProvider',
        'CozenFloatingFeedProvider'
    ];

    // Global configuration
    function config($locationProvider, $translateProvider, CONFIG, CozenThemesProvider, CozenConfigProvider,
                    tmhDynamicLocaleProvider, $stateProvider, $urlRouterProvider, CozenLazyLoadProvider, CozenFloatingFeedProvider) {

        // Override the CONFIG for the Atom theme
        CozenThemesProvider.setActiveTheme('nolan');
        CozenConfigProvider
            .scrollsBar(false)
            .debug(true)
            .dev(true)
            .logsEnabled(true)
            .dropdownAutoCloseOthers(true)
            .inputModelLengthType('focus')
            .textareaModelLengthType('focus')
            .dropdownDisplayModelLength(true)
            .requiredType('icon')
            .alertIconLeftDefault('fa fa-info-circle')
            .currentLanguage(CONFIG.currentLanguage)
            .popupAnimationInAnimation('zoomIn')
            .popupAnimationOutAnimation('zoomOut')
            .popupFooter(false)
            .btnToggleStartRight(false);
        CozenLazyLoadProvider
            .log(true)
            .positionTop('70px')
            .positionLeft('10px');
        CozenFloatingFeedProvider
            .width(520)
            .timeoutTime(14000);

        // Configure the location provider
        $locationProvider
            .html5Mode({
                enabled    : false,
                requireBase: false
            })
            .hashPrefix('!');

        // Configure the translate provider
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        $translateProvider.useStaticFilesLoader({
                prefix: '/languages/',
                suffix: '.concat.json'
            }
        );
        $translateProvider.preferredLanguage(CONFIG.currentLanguage);

        // Configure the locale for moment
        moment.locale(CONFIG.currentLanguage);

        // Configure the locale for angular default services
        tmhDynamicLocaleProvider
            .localeLocationPattern('/bower_components/angular-i18n/angular-locale_{{locale}}.js')
            .defaultLocale(CONFIG.currentLanguage);

        // Square route (parent)
        $stateProvider
            .state('square', {
                abstract: true,
                url     : '/square/:lang',
                template: '<ui-view/>'
            });

        // Default route
        $urlRouterProvider.otherwise('/square/' + CONFIG.currentLanguage + '/home');
    }

})(window.angular, window);
