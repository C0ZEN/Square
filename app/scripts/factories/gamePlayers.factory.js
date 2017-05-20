(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gamePlayers', gamePlayers);

    gamePlayers.$inject = [
        'cozenLazyLoadRandom',
        '$filter'
    ];

    function gamePlayers(cozenLazyLoadRandom, $filter) {

        // Private data
        var players = [];
        var methods = {
            createHumanPlayer: createHumanPlayer,
            createIaPlayer   : createIaPlayer,
            getColor         : getColor
        };

        // Public functions
        return {
            createPlayers: createPlayers,
            getPlayers   : getPlayers
        };

        function createPlayers(gameConfiguration) {
            players = [];
            if (gameConfiguration.type.gameTypeName == 'humanVsIa') {
                players.push(methods.createHumanPlayer(1));
            }
            else {
                players.push(methods.createIaPlayer(1));
            }
            players.push(methods.createIaPlayer(2));
            return players;
        }

        function getPlayers() {
            return players;
        }

        /// INTERNAL METHODS ///

        function createHumanPlayer(id) {
            return {
                id   : id,
                name : $filter('translate')('PEOPLE.YOU'),
                color: methods.getColor(id),
                image: 'images/icons8/nolan/39/Person-Male.png'
            };
        }

        function createIaPlayer(id) {
            return {
                id   : id,
                name : cozenLazyLoadRandom.getRandomFirstName('male', 'en'),
                color: methods.getColor(id),
                image: 'images/icons8/nolan/39/Robot-3.png'
            };
        }

        function getColor(id) {
            return id == 1 ? 'yellow' : 'blue';
        }
    }

})(window.angular);

