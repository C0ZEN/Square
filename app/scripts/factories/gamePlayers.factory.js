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
            createIaPlayer   : createIaPlayer
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
                id  : id,
                name: $filter('translate')('PEOPLE.YOU')
            };
        }

        function createIaPlayer(id) {
            return {
                id  : id,
                name: cozenLazyLoadRandom.getRandomFirstName('male', 'en')
            };
        }
    }

})(window.angular);

