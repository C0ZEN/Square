/**
 * @ngdoc directive
 * @name square-player
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {string} squarePlayerName > Name of the player
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .directive('squarePlayer', squarePlayer);

    squarePlayer.$inject = [
        '$rootScope'
    ];

    function squarePlayer($rootScope) {
        return {
            link       : link,
            restrict   : 'E',
            scope      : {
                squarePlayerName: '=?'
            },
            replace    : false,
            transclude : false,
            templateUrl: 'scripts/directives/square-player/squarePlayer.template.html'
        };

        function link(scope, element, attrs) {
            var methods = {
                init   : init,
                destroy: destroy
            };

            methods.init();

            function init() {

            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }
        }
    }

})(window.angular);

