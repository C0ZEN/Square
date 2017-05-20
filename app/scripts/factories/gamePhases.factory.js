(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gamePhases', gamePhases);

    gamePhases.$inject = [
        '$rootScope'
    ];

    function gamePhases($rootScope) {

        // Private data
        var phases = [
            'waiting',
            'playing'
        ];
        var currentPhase;

        // Public functions
        return {
            initPhase      : initPhase,
            getCurrentPhase: getCurrentPhase,
            nextPhase      : nextPhase
        };

        function initPhase(callback) {
            currentPhase = phases[0];
            if (typeof callback == 'function') {
                callback();
            }
            return getCurrentPhase();
        }

        function getCurrentPhase() {
            return currentPhase;
        }

        function nextPhase() {
            for (var i = 0, length = phases.length; i < length; i++) {
                if (currentPhase == phases[i]) {
                    if (i + 1 == length) {
                        initPhase(function () {
                            $rootScope.$broadcast('gamePhases:newPhase', {
                                newPhase: currentPhase
                            });
                        });
                    }
                    else {
                        currentPhase = phases[i + 1];
                        $rootScope.$broadcast('gamePhases:newPhase', {
                            newPhase: currentPhase
                        });
                        return getCurrentPhase();
                    }
                }
            }
        }
    }

})(window.angular);

