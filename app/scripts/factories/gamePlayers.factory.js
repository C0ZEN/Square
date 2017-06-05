(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gamePlayers', gamePlayers);

    gamePlayers.$inject = [
        'cozenLazyLoadRandom',
        '$filter',
        'gamePhases'
    ];

    function gamePlayers(cozenLazyLoadRandom, $filter, gamePhases) {

        // Private data
        var players = [];
        var currentPlayer;
        var firstPlayer;
        var methods = {
            createHumanPlayer: createHumanPlayer,
            createIaPlayer   : createIaPlayer,
            getColor         : getColor
        };

        // Public functions
        return {
            createPlayers      : createPlayers,
            getPlayers         : getPlayers,
            getPlayer          : getPlayer,
            getCurrentPlayer   : getCurrentPlayer,
            setCurrentPlayer   : setCurrentPlayer,
            toggleCurrentPlayer: toggleCurrentPlayer
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

        function getPlayer(playerName) {
            for (var i = 0, length = players.length; i < length; i++) {
                if (playerName == players[i].name) {
                    return players[i];
                }
            }
            return null;
        }

        function getCurrentPlayer() {
            return currentPlayer;
        }

        function setCurrentPlayer(playerName) {
            currentPlayer = getPlayer(playerName);
            firstPlayer   = currentPlayer;
        }

        function toggleCurrentPlayer() {
            currentPlayer = currentPlayer.name == players[0].name ? players[1] : players[0];
            return currentPlayer;
        }

        /// INTERNAL METHODS ///

        function createHumanPlayer(id) {
            var playerType = 'human';
            return {
                id   : id,
                name : $filter('translate')('PEOPLE.YOU'),
                color: methods.getColor(id, playerType),
                image: 'images/icons8/nolan/39/Person-Male.png',
                type : playerType
            };
        }

        function createIaPlayer(id) {
            var playerType = 'bot';
            return {
                id   : id,
                name : cozenLazyLoadRandom.getRandomFirstName('male', 'en'),
                color: methods.getColor(id, playerType),
                image: 'images/icons8/nolan/39/Robot-3.png',
                type : playerType
            };
        }

        function getColor(id, playerType) {
            if (playerType == 'human') {
                return 'yellow';
            }
            return id == 1 ? 'purple' : 'blue';
        }
    }

})(window.angular);

