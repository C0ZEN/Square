(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gameTypes', gameTypes);

    gameTypes.$inject = [
        '$rootScope'
    ];

    function gameTypes($rootScope) {

        // Private data
        var gameTypes      = [
            {
                id            : '1',
                name          : 'humanVsIa',
                playerOneImage: 'images/icons8/nolan/64/Person-Male.png',
                playOneLabel  : 'PEOPLE.HUMAN',
                playerTwoImage: 'images/icons8/nolan/64/Robot-3.png',
                playTwoLabel  : 'PEOPLE.IA'
            },
            {
                id            : '2',
                name          : 'iaVsIa',
                playerOneImage: 'images/icons8/nolan/64/Robot-3.png',
                playOneLabel  : 'PEOPLE.IA',
                playerTwoImage: 'images/icons8/nolan/64/Robot-3.png',
                playTwoLabel  : 'PEOPLE.IA'
            }
        ];
        var activeGameType = gameTypes[0].name;

        // Public functions
        return {
            getGameTypes     : getGameTypes,
            getActiveGameType: getActiveGameType,
            setActiveGameType: setActiveGameType
        };

        function getGameTypes() {
            return gameTypes;
        }

        function getActiveGameType() {
            for (var i = 0, length = gameTypes.length; i < length; i++) {
                if (activeGameType == gameTypes[i].name) {
                    return gameTypes[i];
                }
            }
            return null;
        }

        function setActiveGameType(gameTypeName) {
            if (activeGameType != gameTypeName) {
                activeGameType = gameTypeName;
                $rootScope.$broadcast('gameTypes:newActiveGameType', {
                    activeGameType: getActiveGameType()
                });
            }
        }
    }

})(window.angular);

