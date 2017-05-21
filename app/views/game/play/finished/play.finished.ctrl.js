(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('GamePlayFinishedCtrl', GamePlayFinishedCtrl);

    GamePlayFinishedCtrl.$inject = [
        'gamePhases',
        'goTo',
        'gameWinner',
        '$rootScope'
    ];

    function GamePlayFinishedCtrl(gamePhases, goTo, gameWinner, $rootScope) {
        var playFinished = this;

        // Public methods
        playFinished.methods = {
            start: start
        };

        // Check if the view can be loaded
        if (gamePhases.getCurrentPhase() != 'finished') {
            goTo.view('square.game.play.begin');
        }

        // Get the winner
        playFinished.winner = gameWinner.getWinner();

        function start() {
            gamePhases.nextPhase();
            gamePhases.nextPhase();
            goTo.view('square.game.play.play');
            $rootScope.$broadcast('timer-start');
        }
    }

})(window.angular);

