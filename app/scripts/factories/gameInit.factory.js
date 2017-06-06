(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gameInit', gameInit);

    gameInit.$inject = [
        'gameTypes',
        'gameLevels',
        'localStorageService'
    ];

    function gameInit(gameTypes, gameLevels, localStorageService) {

        // Private data
        var defaultConfiguration          = {
            grid : {
                rowsQuantity   : 6,
                columnsQuantity: 6
            },
            type : {
                gameTypeName: gameTypes.getActiveGameType().name,
                gameSpeed   : 500
            },
            level: {
                gameLevelName : gameLevels.getActiveGameLevel(false).name,
                gameLevelName2: gameLevels.getActiveGameLevel(true).name
            }
        };
        var localStorageConfigurationName = 'square.configuration';
        var configuration                 = localStorageService.get(localStorageConfigurationName);

        // Public functions
        return {
            getDefaultConfiguration: getDefaultConfiguration,
            getConfiguration       : getConfiguration,
            setConfiguration       : setConfiguration
        };

        function getDefaultConfiguration() {
            return defaultConfiguration;
        }

        function getConfiguration() {
            if (Methods.isNullOrEmpty(configuration)) {
                configuration = defaultConfiguration;
            }
            return configuration;
        }

        function setConfiguration(newConfiguration) {
            configuration = newConfiguration;
            localStorageService.set(localStorageConfigurationName, newConfiguration);
        }
    }

})(window.angular);

