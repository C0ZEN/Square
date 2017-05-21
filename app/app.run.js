(function (angular, window) {
    'use strict';

    angular
        .module('squareApp')
        .run(run);

    run.$inject = [
        '$rootScope',
        '$state',
        'goTo',
        'CONFIG'
    ];

    function run($rootScope, $state, goTo, CONFIG) {

        // Public global data
        $rootScope.publicData = {
            innerHeight: window.innerHeight
        };

        // Public global services
        $rootScope.$state   = $state;
        $rootScope.$goTo    = goTo;
        $rootScope.$CONFIG  = CONFIG;
        $rootScope.$Methods = Methods;
    }

})(window.angular, window);
