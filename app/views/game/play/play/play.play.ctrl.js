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
        '$interval',
        '$scope',
        '$state'
    ];

    function GamePlayPlayCtrl(gamePhases, goTo, gameInit, gamePlayers, gameGrid, gameWinner, $rootScope, gameBot, cozenEnhancedLogs,
                              $interval, $scope, $state) {
        var playPlay = this;

        // Public methods
        playPlay.methods = {
            onClickBar   : onClickBar,
            startIaVsIa  : startIaVsIa,
            getBarClasses: getBarClasses
        };

        // Check if the view can be loaded
        if (gamePhases.getCurrentPhase() != 'playing') {
            goTo.view('square.game.play.begin');
        }

        // Reset the scores
        gamePlayers.resetScores();

        // Get the configuration
        playPlay.configuration = gameInit.getConfiguration();

        // Create the rows array
        playPlay.grid = gameGrid.createGrid(playPlay.configuration.grid.rowsQuantity, playPlay.configuration.grid.columnsQuantity);

        // Get the current player
        playPlay.currentPlayer = gamePlayers.getCurrentPlayer();
        playPlay.lastBotBar    = null;

        // Get the maximum of laps
        playPlay.totalLaps = gamePhases.getTotalLaps(playPlay.configuration.grid.rowsQuantity, playPlay.configuration.grid.columnsQuantity);

        // If the current game is IA vs IA
        playPlay.disabled = false;
        if (playPlay.configuration.type.gameTypeName == 'iaVsIa') {
            playPlay.disabled = true;
            startIaVsIa();
        }

        // Watch for pause event to pause the game
        $rootScope.$on('game:pause', function () {
            playPlay.isPaused = true;
        });

        // Watch for play event to play the game
        $rootScope.$on('game:play', function () {
            playPlay.isPaused = false;
        });

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

            // Stop the play if the game is paused
            if (playPlay.isPaused) {
                return;
            }

            // The bot is playing
            playPlay.botPlaying = true;
            var response, gameLevel;

            // Define the gameLevel
            if (playPlay.configuration.type.gameTypeName == 'iaVsIa') {
                if (playPlay.currentPlayer.id == 1) {
                    gameLevel = playPlay.configuration.level.gameLevelName;
                }
                else {
                    gameLevel = playPlay.configuration.level.gameLevelName2;
                }
            }
            else {
                gameLevel = playPlay.configuration.level.gameLevelName;
            }

            // Make the bot play
            cozenEnhancedLogs.wrap.starting('botPlay', 'Started to play on ' + gameLevel + '...');
            switch (gameLevel) {
                case 'very-easy':
                    response = gameBot.playOnVeryEasy(playPlay.grid, playPlay.currentPlayer);
                    break;
                case 'easy':
                    response = gameBot.playOnEasy(playPlay.grid, playPlay.currentPlayer);
                    break;
                case 'medium':
                    response = gameBot.playOnMedium(playPlay.grid, playPlay.currentPlayer);
                    break;
                case 'hard':
                    response = gameBot.playOnHard(playPlay.grid, playPlay.currentPlayer);
                    break;
                case 'very-hard':
                    response = gameBot.playOnVeryHard(playPlay.grid, playPlay.currentPlayer);
                    break;
            }
            cozenEnhancedLogs.wrap.end('botPlay', 'Finished to play on ' + gameLevel + ' in');

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
                gameWinner.findAndSetWinner();
                $rootScope.$broadcast('timer-pause');
                gamePhases.nextPhase();
                goTo.view('square.game.play.finished', {winnerName: playPlay.currentPlayer.name});

                // Very important to return to break the function
                // Without it, the stuff on canReplay will be executed and blocked the app
                return;
            }

            // When the user can replay and that user is a bot
            // Make it play again
            if (response.canReplay) {
                cozenEnhancedLogs.info.customMessage('afterPlay', 'We finished a square, the user can replay');
                if (playPlay.currentPlayer.type == 'bot') {
                    cozenEnhancedLogs.info.customMessage('afterPlay', 'The bot can replay');
                    botPlay();
                }
            }
            else {

                // Highlight the last bar of the bot if humanVsIa
                if (playPlay.configuration.type.gameTypeName == 'humanVsIa') {
                    playPlay.lastBotBar = response.bar;
                }
            }
        }

        function startIaVsIa() {
            if (Methods.isNullOrEmpty($rootScope.publicData.playInterval)) {

                // Start the global interval
                $rootScope.publicData.playInterval = $interval(function () {

                    // Check if we can play
                    if (gamePhases.getCurrentPhase() == 'playing' &&
                        $state.current.name == 'square.game.play.play' &&
                        playPlay.configuration.type.gameTypeName == 'iaVsIa') {

                        // Stop the play if the game is paused
                        if (!playPlay.isPaused) {
                            botPlay();
                        }
                    }
                }, playPlay.configuration.type.gameSpeed);
            }
        }

        function getBarClasses(direction, column, rowId) {
            var classes = [];
            if (direction == 'horizontal') {
                classes.push(column.barHorizontalColor);
                if (column.barHorizontalSelected != false) {
                    classes.push('selected');
                }
            }
            else {
                classes.push(column.barVerticalColor);
                if (column.barVerticalSelected != false) {
                    classes.push('selected');
                }
            }
            if (playPlay.lastBotBar != null) {
                if (playPlay.lastBotBar.row == rowId &&
                    playPlay.lastBotBar.column == column.id &&
                    playPlay.lastBotBar.direction == direction) {
                    classes.push('blink');
                }
            }
            return classes;
        }
    }

})(window.angular);

