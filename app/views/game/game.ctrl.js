(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('GameCtrl', GameCtrl);

    GameCtrl.$inject = [
        'gameInit',
        'gamePlayers',
        'CONFIG',
        'cozenEnhancedLogs',
        '$rootScope',
        'gamePhases',
        'gameWinner'
    ];

    function GameCtrl(gameInit, gamePlayers, CONFIG, cozenEnhancedLogs, $rootScope, gamePhases, gameWinner) {
        var game = this;

        // Public methods
        game.methods = {
            onHeaderClick: onHeaderClick
        };

        // Get the last configuration
        game.configuration = gameInit.getConfiguration();
        if (CONFIG.debug) {
            cozenEnhancedLogs.info.functionCalled('GameCtrl', 'getConfiguration');
            cozenEnhancedLogs.explodeObject(game.configuration, true);
        }

        // Create the players
        game.players = gamePlayers.createPlayers(game.configuration);
        if (CONFIG.debug) {
            cozenEnhancedLogs.info.functionCalled('GameCtrl', 'createPlayers');
            cozenEnhancedLogs.explodeObject(game.players, true);
        }

        // Create the data for the title
        game.h1 = {
            player1: game.players[0].name,
            color1 : game.players[0].color,
            player2: game.players[1].name,
            color2 : game.players[1].color
        };

        // Define the current player
        game.currentPlayer = gamePlayers.setCurrentPlayer(game.players[0].name);

        // Define the total laps
        game.totalLaps = gamePhases.getTotalLaps(game.configuration.grid.rowsQuantity, game.configuration.grid.columnsQuantity);

        // Define the number of square
        game.totalScore = (game.configuration.grid.rowsQuantity - 1) * (game.configuration.grid.columnsQuantity - 1);

        // Watch for a new phase
        $rootScope.$on('gamePhases:newPhase', function ($event, $response) {
            game.phase      = $response.newPhase;
            game.currentLap = $response.currentLap;
            game.isPaused   = false;
            $rootScope.$broadcast('game:play');
            if (game.phase != 'playing') {
                game.currentPlayer = null;
            }
            else {
                game.currentPlayer = gamePlayers.getCurrentPlayer();
            }

            // Define the winner
            if (game.phase == 'finished') {
                game.winner           = gameWinner.getWinner();
                game.totalSquareScore = [];
            }
            else {
                game.winner = null;
            }

            // Update the total score
            if (game.phase == 'playing') {
                game.totalSquareScore = Methods.getNumberArray(game.totalScore);
            }
        });

        // Watch for a new lap
        $rootScope.$on('gamePhases:newLap', function ($event, $response) {
            game.currentLap = $response.newLap;
        });

        // Watch for a change of the current player
        $rootScope.$on('gamePlayers:currentPlayerChanged', function ($event, $response) {
            game.currentPlayer = $response.currentPlayer;
        });

        // Watch for a change of score
        $rootScope.$on('gamePlayers:scoreChanged', function () {
            game.players = gamePlayers.getPlayers();

            // Define the current score
            var currentScore = game.totalScore - game.players[0].score - game.players[1].score;
            if (typeof currentScore == 'number') {
                game.totalSquareScore = Methods.getNumberArray(currentScore);
            }
        });

        function onHeaderClick($event) {
            $event.stopPropagation();
            if (game.configuration.type.gameTypeName == 'iaVsIa' && game.phase == 'playing') {
                game.isPaused = !game.isPaused;
                if (game.isPaused) {
                    $rootScope.$broadcast('game:pause');
                }
                else {
                    $rootScope.$broadcast('game:play');
                }
            }
        }
    }

})(window.angular);

