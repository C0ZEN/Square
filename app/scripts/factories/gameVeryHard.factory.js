(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gameVeryHard', gameVeryHard);

    gameVeryHard.$inject = [];

    function gameVeryHard() {

        // Private data
        var myTmpGridForExample;

        // Public functions
        return {
            doSomeStuff: doSomeStuff
        };

        function doSomeStuff() {

        }
    }

})(window.angular);

