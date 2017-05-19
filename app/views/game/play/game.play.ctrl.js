(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('GamePlayCtrl', GamePlayCtrl);

    GamePlayCtrl.$inject = [
        'goTo',
        'gameInit',
        'gamePlayers'
    ];

    function GamePlayCtrl(goTo, gameInit, gamePlayers) {
        var play = this;

        // Public methods
        play.methods = {};
    }

})(window.angular);

