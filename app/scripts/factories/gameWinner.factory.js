(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gameWinner', gameWinner);

    gameWinner.$inject = [
        'gamePlayers',
        'gameLevels'
    ];

    function gameWinner(gamePlayers, gameLevels) {

        // Private data
        var winner;

        // Public functions
        return {
            setWinner       : setWinner,
            getWinner       : getWinner,
            findAndSetWinner: findAndSetWinner
        };

        function setWinner(newWinner) {
            winner = newWinner;
        }

        function getWinner() {
            return winner;
        }

        function findAndSetWinner() {
            var players = gamePlayers.getPlayers();
            var winner;
            if (players[0].score >= players[1].score) {
                winner = players[0];
            }
            else {
                winner = players[1];
            }
            setWinner(winner);
        }
    }

})(window.angular);

