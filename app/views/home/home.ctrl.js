(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [];

    function HomeCtrl() {
        var home = this;
    }

})(window.angular);

