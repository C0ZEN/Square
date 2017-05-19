(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('InitCtrl', InitCtrl);

    InitCtrl.$inject = [
        'gameTypes',
        '$rootScope',
        'gameLevels'
    ];

    function InitCtrl(gameTypes, $rootScope, gameLevels) {
        var init = this;

        // Models with default values
        init.grid  = {
            rowsQuantity   : 6,
            columnsQuantity: 6
        };
        init.type  = {
            gameTypeName: gameTypes.getActiveGameType().name
        };
        init.level = {
            gameLevelName: gameLevels.getActiveGameLevel().name
        };

        // Listeners
        $rootScope.$on('gameTypes:newActiveGameType', function ($event, $response) {
            init.type.gameTypeName = $response.activeGameType.name;
        });
        $rootScope.$on('gameLevels:newActiveGameLevel', function ($event, $response) {
            init.level.gameLevelName = $response.activeGameLevel.name;
        });
    }

})(window.angular);

