(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('InitCtrl', InitCtrl);

    InitCtrl.$inject = [
        'gameTypes'
    ];

    function InitCtrl(gameTypes) {
        var init = this;

        // Models with default values
        init.grid = {
            rowsQuantity   : 6,
            columnsQuantity: 6
        };
        init.type = {
            gameTypeName: gameTypes.getGameTypes()[0].name
        };
    }

})(window.angular);

