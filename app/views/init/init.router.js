(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {
        $stateProvider
            .state('square.init', {
                abstract    : true,
                url         : '/init',
                controller  : 'InitCtrl',
                controllerAs: 'init',
                templateUrl : 'views/init/init.html'
            })
            .state('square.init.grid', {
                url         : '/grid',
                controller  : 'InitGridCtrl',
                controllerAs: 'grid',
                templateUrl : 'views/init/grid/init.grid.html',
                data        : {
                    pageTitle: 'INIT.GRID.TITLE'
                }
            })
            .state('square.init.type', {
                url         : '/type',
                controller  : 'InitTypeCtrl',
                controllerAs: 'type',
                templateUrl : 'views/init/type/init.type.html',
                data        : {
                    pageTitle: 'INIT.TYPE.TITLE'
                }
            })
            .state('square.init.level', {
                url         : '/level',
                controller  : 'InitLevelCtrl',
                controllerAs: 'level',
                templateUrl : 'views/init/level/init.level.html',
                data        : {
                    pageTitle: 'INIT.LEVEL.TITLE'
                }
            });
    }

})(window.angular);
