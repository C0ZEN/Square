(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('GamePlayFinishedCtrl', GamePlayFinishedCtrl);

    GamePlayFinishedCtrl.$inject = [
        'gamePhases',
        'goTo',
        'gameWinner',
        '$rootScope',
        'gamePlayers'
    ];

    function GamePlayFinishedCtrl(gamePhases, goTo, gameWinner, $rootScope, gamePlayers) {
        var playFinished = this;

        // Public methods
        playFinished.methods = {
            start: start
        };

        // Check if the view can be loaded
        if (gamePhases.getCurrentPhase() != 'finished') {
            goTo.view('square.game.play.begin');
        }

        // Get the winner and looser
        playFinished.winner = gameWinner.getWinner();
        playFinished.looser = gameWinner.getLooser();

        // Define the score
        if (!Methods.isNullOrEmpty(playFinished.winner) && !Methods.isNullOrEmpty(playFinished.looser)) {
            playFinished.score = {
                winner: playFinished.winner.score,
                looser: playFinished.looser.score
            };
        }

        function start() {
            gamePhases.nextPhase();
            gamePhases.nextPhase();
            goTo.view('square.game.play.play');
            $rootScope.$broadcast('timer-start');
        }
    }

})(window.angular);

