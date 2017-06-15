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
        var looser;

        // Public functions
        return {
            setWinner       : setWinner,
            getWinner       : getWinner,
            setLooser       : setLooser,
            getLooser       : getLooser,
            findAndSetWinner: findAndSetWinner
        };

        function setWinner(newWinner) {
            winner = newWinner;
        }

        function getWinner() {
            return winner;
        }

        function setLooser(newLooser) {
            looser = newLooser;
        }

        function getLooser() {
            return looser;
        }

        function findAndSetWinner() {
            var players = gamePlayers.getPlayers();
            var winner;
            if (players[0].score >= players[1].score) {
                winner = players[0];
                looser = players[1];
            }
            else {
                winner = players[1];
                looser = players[0];
            }
            setWinner(winner);
            setLooser(looser);
        }
    }

})(window.angular);

