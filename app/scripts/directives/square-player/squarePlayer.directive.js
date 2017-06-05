/**
 * @ngdoc directive
 * @name square-player
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {string}  squarePlayerName   > Name of the player
 * @param {string}  squarePlayerImage  > Path of the image for the player
 * @param {string}  squarePlayerColor  > Color of the player
 * @param {boolean} squarePlayerActive > Display or hide the active icon
 *
 * [Attribute params]
 * @param {boolean} squarePlayerReverse    = false > Reverse the order of the elements (display)
 * @param {string}  squarePlayerActiveIcon         > Icon when the player is active (path)
 * @param {string}  squarePlayerDirection  = left  > Direction for the active icon animation (left/right)
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
                squarePlayerName  : '=?',
                squarePlayerImage : '=?',
                squarePlayerColor : '=?',
                squarePlayerActive: '=?'
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

                // Default values (scope)
                angular.isUndefined(attrs.squarePlayerActive) ? scope.squarePlayerActive = false : null;

                // Default values (attributes)
                scope.squarePlayerReverse    = angular.isUndefined(attrs.squarePlayerReverse) ? false : JSON.parse(attrs.squarePlayerReverse);
                scope.squarePlayerActiveIcon = angular.isUndefined(attrs.squarePlayerActiveIcon) ? '' : attrs.squarePlayerActiveIcon;
                scope.squarePlayerDirection  = angular.isUndefined(attrs.squarePlayerDirection) ? 'left' : attrs.squarePlayerDirection;
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }
        }
    }

})(window.angular);

