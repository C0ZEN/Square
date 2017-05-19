(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gameTypes', gameTypes);

    gameTypes.$inject = [];

    function gameTypes() {

        // Private data
        var gameTypes = [
            {
                id            : '1',
                name          : 'humanVsIa',
                playerOneImage: 'images/icons8/nolan/64/Person-Male.png',
                playOneName   : 'PEOPLE.HUMAN',
                playerTwoImage: 'images/icons8/nolan/64/Robot-3.png',
                playTwoName   : 'PEOPLE.IA'
            },
            {
                id            : '2',
                name          : 'iaVsIa',
                playerOneImage: 'images/icons8/nolan/64/Robot-3.png',
                playOneName   : 'PEOPLE.IA',
                playerTwoImage: 'images/icons8/nolan/64/Robot-3.png',
                playTwoName   : 'PEOPLE.IA'
            }
        ];

        // Public functions
        return {
            getGameTypes: getGameTypes
        };

        function getGameTypes() {
            return gameTypes;
        }
    }

})(window.angular);

