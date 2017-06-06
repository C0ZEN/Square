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

        function onClickGameLevel($event, gameLevelName, secondIa) {

            // Default value
            if (Methods.isNullOrEmpty(secondIa)) {
                secondIa = false;
            }

            $event.stopPropagation();
            if (secondIa) {
                gameLevels.setActiveGameLevel(gameLevelName, true);
            }
            else {
                gameLevels.setActiveGameLevel(gameLevelName, false);
            }
        }

        function submit() {
            goTo.view('square.game.play.begin');
        }
    }

})(window.angular);

