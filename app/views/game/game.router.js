(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {
        $stateProvider
            .state('square.game', {
                abstract    : true,
                url         : '/game',
                controller  : 'GameCtrl',
                controllerAs: 'game',
                templateUrl : 'views/game/game.html'
            })
            .state('square.game.play', {
                url         : '/play',
                controller  : 'GamePlayCtrl',
                controllerAs: 'play',
                templateUrl : 'views/game/play/game.play.html',
                data        : {
                    pageTitle: 'GAME.PLAY.TITLE'
                }
            });
    }

})(window.angular);
