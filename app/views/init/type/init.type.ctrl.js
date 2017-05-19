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

        // Get the game types list
        type.gameTypes = gameTypes.getGameTypes();

        type.submit = function () {
            goTo.view('square.init.difficulty');
        };
    }

})(window.angular);

