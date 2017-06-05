(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gameInit', gameInit);

    gameInit.$inject = [
        'gameTypes',
        'gameLevels'
    ];

    function gameInit(gameTypes, gameLevels) {

        // Private data
        var defaultConfiguration = {
            grid : {
                rowsQuantity   : 6,
                columnsQuantity: 6
            },
            type : {
                gameTypeName: gameTypes.getActiveGameType().name,
                gameSpeed   : 500
            },
            level: {
                gameLevelName: gameLevels.getActiveGameLevel().name
            }
        };
        var configuration        = null;

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
            if (configuration == null) {
                configuration = defaultConfiguration;
            }
            return configuration;
        }

        function setConfiguration(newConfiguration) {
            configuration = newConfiguration;
        }
    }

})(window.angular);

