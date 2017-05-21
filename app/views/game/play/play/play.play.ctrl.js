(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('GamePlayPlayCtrl', GamePlayPlayCtrl);

    GamePlayPlayCtrl.$inject = [
        'gamePhases',
        'goTo',
        'gameInit',
        'gamePlayers',
        'gameGrid',
        'gameWinner',
        '$rootScope'
    ];

    function GamePlayPlayCtrl(gamePhases, goTo, gameInit, gamePlayers, gameGrid, gameWinner, $rootScope) {
        var playPlay = this;

        // Public methods
        playPlay.methods = {
            onClickBar: onClickBar
        };

        // Check if the view can be loaded
        if (gamePhases.getCurrentPhase() != 'playing') {
            goTo.view('square.game.play.begin');
        }

        // Get the configuration
        playPlay.configuration = gameInit.getConfiguration();

        // Create the rows array
        playPlay.grid = gameGrid.createGrid(playPlay.configuration.grid.rowsQuantity, playPlay.configuration.grid.columnsQuantity);

        // Get the current player
        playPlay.currentPlayer = gamePlayers.getCurrentPlayer();

        // Get the maximum of laps
        playPlay.totalLaps = gamePhases.getTotalLaps(playPlay.configuration.grid.rowsQuantity, playPlay.configuration.grid.columnsQuantity);

        // When the user select a bar
        function onClickBar($event, direction, row, column) {
            $event.stopPropagation();

            // Select the element on the grid
            var response  = gameGrid.selectGridElement(row.id, column.id, direction, playPlay.currentPlayer);
            playPlay.grid = response.grid;

            // Next player
            if (!response.canReplay) {
                playPlay.currentPlayer = gamePlayers.toggleCurrentPlayer();
            }

            // Increase the lap
            playPlay.currentLap = gamePhases.nextLap();

            // Check if it is finished
            if (playPlay.currentLap > playPlay.totalLaps) {
                gameWinner.setWinner(playPlay.currentPlayer);
                $rootScope.$broadcast('timer-pause');
                gamePhases.nextPhase();
                goTo.view('square.game.play.finished', {winnerName: playPlay.currentPlayer.name});
            }
        }
    }

})(window.angular);

