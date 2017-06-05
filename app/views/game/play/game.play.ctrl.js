(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('GamePlayCtrl', GamePlayCtrl);

    GamePlayCtrl.$inject = [];

    function GamePlayCtrl() {
        var play = this;

        // Public methods
        play.methods = {};
    }

})(window.angular);

