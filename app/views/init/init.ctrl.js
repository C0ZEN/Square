(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('InitCtrl', InitCtrl);

    InitCtrl.$inject = [
        'gameTypes',
        '$rootScope',
        'gameLevels',
        'gameInit',
        'cozenFloatingFeedFactory',
        '$interval'
    ];

    function InitCtrl(gameTypes, $rootScope, gameLevels, gameInit, cozenFloatingFeedFactory, $interval) {
        var init = this;

        // Public methods
        init.methods = {
            saveConfiguration: saveConfiguration
        };

        // Models with default values
        init.configuration = angular.copy(gameInit.getConfiguration());

        // Listeners
        $rootScope.$on('gameTypes:newActiveGameType', function ($event, $response) {
            init.configuration.type.gameTypeName = angular.copy($response.activeGameType.name);
        });
        $rootScope.$on('gameLevels:newActiveGameLevel', function ($event, $response) {
            init.configuration.level.gameLevelName = angular.copy($response.activeGameLevel.name);
        });
        $rootScope.$on('gameLevels:newActiveGameLevel2', function ($event, $response) {
            init.configuration.level.gameLevelName2 = angular.copy($response.activeGameLevel2.name);
        });

        function saveConfiguration($event) {
            if (!Methods.isNullOrEmpty($event)) {
                $event.stopPropagation();
            }
            cozenFloatingFeedFactory.addAlert({
                type : 'purple',
                label: 'INIT.SETTINGS_SAVED'
            });

            // We need to cancel this interval
            // The time could have changed so we need to recreate it
            if (!Methods.isNullOrEmpty($rootScope.publicData.playInterval)) {
                $interval.cancel($rootScope.publicData.playInterval);
                $rootScope.publicData.playInterval = null;
            }
            gameInit.setConfiguration(init.configuration);
        }
    }

})(window.angular);

