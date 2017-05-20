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
        '$scope'
    ];

    function GameCtrl(gameInit, gamePlayers, CONFIG, cozenEnhancedLogs, $scope) {
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

        $scope.$broadcast('timer-start');
    }

})(window.angular);

