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
        '$rootScope',
        'gameBot',
        'cozenEnhancedLogs',
        '$interval'
    ];

    function GamePlayPlayCtrl(gamePhases, goTo, gameInit, gamePlayers, gameGrid, gameWinner, $rootScope, gameBot, cozenEnhancedLogs,
                              $interval) {
        var playPlay = this;

        // Public methods
        playPlay.methods = {
            onClickBar: onClickBar
        };

        // Internal data
        var interval;

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

        // If the current game is IA vs IA
        if (playPlay.configuration.type.gameTypeName == 'iaVsIa') {
            interval = $interval(function () {
                botPlay();

                // Check if the game is over
                if (playPlay.currentLap > playPlay.totalLaps) {

                    // Stop the interval
                    $interval.cancel(interval);
                }
            }, 500);
        }

        // When the user select a bar
        function onClickBar($event, direction, row, column) {
            cozenEnhancedLogs.info.customMessage('onClickBar', 'The user has selected a bar');
            $event.stopPropagation();

            // Select the element on the grid
            var response = gameGrid.selectGridElement(row.id, column.id, direction, playPlay.currentPlayer);

            // Execute the stuff after a play
            afterPlay(response);

            // Make the bot play if the user can not replay
            if (!response.canReplay) {
                botPlay();
            }
        }

        function botPlay(callback) {
            cozenEnhancedLogs.info.customMessage('botPlay', 'The bot can now play');

            // The bot is playing
            playPlay.botPlaying = true;
            var response;

            // Make the bot play
            switch (playPlay.configuration.level.gameLevelName) {
                case 'easy':
                    response = gameBot.playOnEasy(playPlay.grid, playPlay.currentPlayer);
                    break;
            }

            // Execute the stuff after a play
            afterPlay(response);

            // The bot has finished playing
            playPlay.botPlaying = false;

            // Execute the callback function
            if (Methods.isFunction(callback)) {
                callback();
            }
        }

        function afterPlay(response) {

            // Update the grid
            playPlay.grid = response.grid;

            // Increase the lap
            playPlay.currentLap = gamePhases.nextLap();

            // Next player
            if (!response.canReplay) {
                cozenEnhancedLogs.info.customMessage('afterPlay', 'The next player can now play');
                playPlay.currentPlayer = gamePlayers.toggleCurrentPlayer();
            }

            // Check if it is finished
            if (playPlay.currentLap > playPlay.totalLaps) {
                cozenEnhancedLogs.info.customMessage('afterPlay', 'The game is finished');
                $interval.cancel(interval);
                gameWinner.setWinner(playPlay.currentPlayer);
                $rootScope.$broadcast('timer-pause');
                gamePhases.nextPhase();
                goTo.view('square.game.play.finished', {winnerName: playPlay.currentPlayer.name});
            }

            // When the user can replay and that user is a bot
            // Make it play again
            if (response.canReplay) {
                cozenEnhancedLogs.info.customMessage('afterPlay', 'We finished a square, the user can replay.');
                if (playPlay.currentPlayer.type == 'bot') {
                    cozenEnhancedLogs.info.customMessage('afterPlay', 'The bot can replay.');
                    botPlay();
                }
            }
        }
    }

})(window.angular);

