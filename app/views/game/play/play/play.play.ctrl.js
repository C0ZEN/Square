(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('GamePlayPlayCtrl', GamePlayPlayCtrl);

    GamePlayPlayCtrl.$inject = [
        'gamePhases',
        'goTo',
        'gamePlayers'
    ];

    function GamePlayPlayCtrl(gamePhases, goTo, gamePlayers) {
        var playPlay = this;

        // Public methods
        playPlay.methods = {

        };

        // Check if the view can be loaded
    }

})(window.angular);

