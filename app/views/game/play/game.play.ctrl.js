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
    }

})(window.angular);

