(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gameWinner', gameWinner);

    gameWinner.$inject = [
        'rfc4122',
        'gameLevels'
    ];

    function gameWinner(rfc4122, gameLevels) {

        // Private data
        var winner;

        // Public functions
        return {
            setWinner: setWinner,
            getWinner: getWinner
        };

        function setWinner(newWinner) {
            winner = newWinner;
        }

        function getWinner() {
            return winner;
        }
    }

})(window.angular);

