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
            'playing',
            'finished'
        ];
        var currentPhase;
        var currentLap;

        // Public functions
        return {
            initPhase      : initPhase,
            getCurrentPhase: getCurrentPhase,
            nextPhase      : nextPhase,
            getCurrentLap  : getCurrentLap,
            nextLap        : nextLap,
            getTotalLaps   : getTotalLaps
        };

        function initPhase() {
            currentPhase = phases[0];
            currentLap   = 1;
            $rootScope.$broadcast('gamePhases:newPhase', {
                newPhase  : currentPhase,
                currentLap: currentLap
            });
            return getCurrentPhase();
        }

        function getCurrentPhase() {
            return currentPhase;
        }

        function nextPhase() {
            for (var i = 0, length = phases.length; i < length; i++) {
                if (currentPhase == phases[i]) {
                    if (i + 1 == length) {
                        initPhase();
                    }
                    else {
                        currentPhase = phases[i + 1];
                        $rootScope.$broadcast('gamePhases:newPhase', {
                            newPhase  : currentPhase,
                            currentLap: currentLap
                        });
                        return getCurrentPhase();
                    }
                }
            }
        }

        function getCurrentLap() {
            return currentLap;
        }

        function nextLap() {
            currentLap++;
            $rootScope.$broadcast('gamePhases:newLap', {
                newLap: currentLap
            });
            return currentLap;
        }

        function getTotalLaps(rowsQuantity, columnsQuantity) {
            return (rowsQuantity * (rowsQuantity - 1)) + (columnsQuantity * (columnsQuantity - 1));
        }
    }

})(window.angular);

