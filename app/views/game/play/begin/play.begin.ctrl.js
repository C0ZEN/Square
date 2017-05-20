(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('GamePlayBeginCtrl', GamePlayBeginCtrl);

    GamePlayBeginCtrl.$inject = [
        'gamePhases',
        'goTo',
        '$rootScope'
    ];

    function GamePlayBeginCtrl(gamePhases, goTo, $rootScope) {
        var playBegin = this;

        // Public methods
        playBegin.methods = {
            start: start
        };

        function start() {
            gamePhases.nextPhase();
            goTo.view('square.game.play.play');
            $rootScope.$broadcast('timer-start');
            $rootScope.$broadcast('timer-resume');
        }
    }

})(window.angular);

