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

        // Public methods
        grid.methods = {
            submit: submit
        };

        function submit() {
            goTo.view('square.init.type');
        }
    }

})(window.angular);

