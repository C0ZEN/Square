(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('GameCtrl', GameCtrl);

    GameCtrl.$inject = [
        'gameInit',
        'gamePlayers',
        'CONFIG',
        'cozenEnhancedLogs'
    ];

    function GameCtrl(gameInit, gamePlayers, CONFIG, cozenEnhancedLogs) {
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
    }

})(window.angular);

