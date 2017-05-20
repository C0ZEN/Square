(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('GamePlayCtrl', GamePlayCtrl);

    GamePlayCtrl.$inject = [
        'gamePhases',
        '$rootScope',
        'gamePlayers'
    ];

    function GamePlayCtrl(gamePhases, $rootScope, gamePlayers) {
        var play = this;

        // Public methods
        play.methods = {};

        // Init the first phase
        play.phase = gamePhases.initPhase();

        // Watch for a new phase
        $rootScope.$on('gamePhases:newPhase', function ($event, $response) {
            play.phase = $response.newPhase;
        });
    }

})(window.angular);

