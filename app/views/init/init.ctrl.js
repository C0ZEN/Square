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
        'cozenFloatingFeedFactory'
    ];

    function InitCtrl(gameTypes, $rootScope, gameLevels, gameInit, cozenFloatingFeedFactory) {
        var init = this;

        // Public methods
        init.methods = {
            saveConfiguration: saveConfiguration
        };

        // Models with default values
        init.configuration = gameInit.getDefaultConfiguration();

        // Listeners
        $rootScope.$on('gameTypes:newActiveGameType', function ($event, $response) {
            init.configuration.type.gameTypeName = $response.activeGameType.name;
        });
        $rootScope.$on('gameLevels:newActiveGameLevel', function ($event, $response) {
            init.configuration.level.gameLevelName = $response.activeGameLevel.name;
        });

        function saveConfiguration() {
            cozenFloatingFeedFactory.addAlert({
                type : 'purple',
                label: 'INIT.SETTINGS_SAVED'
            });
            gameInit.setConfiguration(init.configuration);
        }
    }

})(window.angular);

