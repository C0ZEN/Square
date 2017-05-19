(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('InitGridCtrl', InitGridCtrl);

    InitGridCtrl.$inject = [
        'goTo'
    ];

    function InitGridCtrl(goTo) {
        var grid = this;

        grid.submit = function () {
            goTo.view('square.init.type');
        };
    }

})(window.angular);

