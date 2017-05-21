/**
 * @ngdoc directive
 * @name square-player
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {string} squarePlayerName  > Name of the player
 * @param {string} squarePlayerImage > Path of the image for the player
 * @param {string} squarePlayerColor > Color of the player
 *
 * [Attribute params]
 * @param {boolean} squarePlayerReverse = false > Reverse the order of the elements (display)
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
                squarePlayerName : '=?',
                squarePlayerImage: '=?',
                squarePlayerColor: '=?'
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

                // Set default values
                scope.squarePlayerReverse = angular.isUndefined(attrs.squarePlayerReverse) ? false : JSON.parse(attrs.squarePlayerReverse);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }
        }
    }

})(window.angular);

