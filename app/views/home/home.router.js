(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {

        // Log routes
        $stateProvider
            .state('square.home', {
                url         : '/home',
                controller  : 'HomeCtrl',
                controllerAs: 'home',
                templateUrl : 'views/home/home.html',
                data       : {
                    pageTitle: 'HOME.TITLE'
                }
            });
    }

})(window.angular);
