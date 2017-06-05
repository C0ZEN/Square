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

        // Init the first phase
        gamePhases.initPhase();

        // When the user click on the start btn
        function start() {
            gamePhases.nextPhase();
            goTo.view('square.game.play.play');
            $rootScope.$broadcast('timer-start');
        }
    }

})(window.angular);

