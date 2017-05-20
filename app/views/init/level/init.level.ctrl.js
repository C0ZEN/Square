(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('InitLevelCtrl', InitLevelCtrl);

    InitLevelCtrl.$inject = [
        'goTo',
        'gameLevels'
    ];

    function InitLevelCtrl(goTo, gameLevels) {
        var level = this;

        // Public methods
        level.methods = {
            onClickGameLevel: onClickGameLevel,
            submit          : submit
        };

        // Get the game types list
        level.gameLevels = gameLevels.getGameLevels();

        function onClickGameLevel($event, gameLevelName) {
            $event.stopPropagation();
            gameLevels.setActiveGameLevel(gameLevelName);
        }

        function submit() {
            goTo.view('square.game.play.begin');
        }
    }

})(window.angular);

