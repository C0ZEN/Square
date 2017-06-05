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
        'gamePhases'
    ];

    function GameCtrl(gameInit, gamePlayers, CONFIG, cozenEnhancedLogs, $rootScope, gamePhases) {
        var game = this;

        // Public methods
        game.methods = {};

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

        // Watch for a new phase
        $rootScope.$on('gamePhases:newPhase', function ($event, $response) {
            game.phase      = $response.newPhase;
            game.currentLap = $response.currentLap;
        });

        // Watch for a new lap
        $rootScope.$on('gamePhases:newLap', function ($event, $response) {
            game.currentLap = $response.newLap;
        });

        // Watch for a change of the current player
        $rootScope.$on('gamePlayers:currentPlayerChanged', function ($event, $response) {
            game.currentPlayer = $response.currentPlayer;
        });
    }

})(window.angular);

