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
                abstract    : true,
                url         : '/play',
                controller  : 'GamePlayCtrl',
                controllerAs: 'play',
                templateUrl : 'views/game/play/game.play.html'
            })
            .state('square.game.play.begin', {
                url         : '/begin',
                controller  : 'GamePlayBeginCtrl',
                controllerAs: 'playBegin',
                templateUrl : 'views/game/play/begin/play.begin.html',
                data        : {
                    pageTitle: 'GAME.PLAY.BEGIN.TITLE'
                }
            })
            .state('square.game.play.play', {
                url         : '/play',
                controller  : 'GamePlayPlayCtrl',
                controllerAs: 'playPlay',
                templateUrl : 'views/game/play/play/play.play.html',
                data        : {
                    pageTitle: 'GAME.PLAY.PLAY.TITLE'
                }
            })
            .state('square.game.play.finished', {
                url         : '/finished/:winnerName',
                controller  : 'GamePlayFinishedCtrl',
                controllerAs: 'playFinished',
                templateUrl : 'views/game/play/finished/play.finished.html',
                data        : {
                    pageTitle: 'GAME.PLAY.FINISHED.TITLE'
                }
            });
    }

})(window.angular);
