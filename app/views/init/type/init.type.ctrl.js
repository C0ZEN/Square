(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('InitTypeCtrl', InitTypeCtrl);

    InitTypeCtrl.$inject = [
        'goTo',
        'gameTypes'
    ];

    function InitTypeCtrl(goTo, gameTypes) {
        var type = this;

        // Public methods
        type.methods = {
            onClickGameType: onClickGameType,
            submit         : submit
        };

        // Get the game types list
        type.gameTypes = gameTypes.getGameTypes();

        function onClickGameType($event, gameTypeName) {
            $event.stopPropagation();
            gameTypes.setActiveGameType(gameTypeName);
        }

        function submit() {
            goTo.view('square.init.level');
        }
    }

})(window.angular);

