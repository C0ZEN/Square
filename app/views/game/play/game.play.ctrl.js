(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('GamePlayCtrl', GamePlayCtrl);

    GamePlayCtrl.$inject = [
        '$rootScope',
        '$scope',
        'gamePlayers'
    ];

    function GamePlayCtrl($rootScope, $scope, gamePlayers) {
        var play = this;

        // Public methods
        play.methods = {};
    }

})(window.angular);

