(function (angular, window) {
    'use strict';

    angular
        .module('squareApp')
        .run(run);

    run.$inject = [
        '$rootScope',
        '$state',
        'goTo'
    ];

    function run($rootScope, $state, goTo) {

        // Public global data
        $rootScope.publicData = {
            innerHeight: window.innerHeight
        };

        // Public global services
        $rootScope.$state = $state;
        $rootScope.$goTo  = goTo;
    }

})(window.angular, window);
