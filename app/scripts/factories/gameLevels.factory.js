(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gameLevels', gameLevels);

    gameLevels.$inject = [
        '$rootScope'
    ];

    function gameLevels($rootScope) {

        // Private data
        var gameLevels       = [
            {
                id      : '1',
                name    : 'very-easy',
                image   : 'images/icons8/nolan/64/Baby.png',
                label   : 'LEVELS.VERY_EASY',
                disabled: false
            },
            {
                id      : '2',
                name    : 'easy',
                image   : 'images/icons8/nolan/64/Babys-Room.png',
                label   : 'LEVELS.EASY',
                disabled: false
            },
            {
                id      : '3',
                name    : 'medium',
                image   : 'images/icons8/nolan/64/Sad.png',
                label   : 'LEVELS.MEDIUM',
                disabled: false
            },
            {
                id      : '4',
                name    : 'hard',
                image   : 'images/icons8/nolan/64/Chiken.png',
                label   : 'LEVELS.HARD',
                disabled: false
            },
            {
                id      : '5',
                name    : 'very-hard',
                image   : 'images/icons8/nolan/64/Skull.png',
                label   : 'LEVELS.VERY_HARD',
                disabled: true
            }
        ];
        var activeGameLevel  = gameLevels[0].name;
        var activeGameLevel2 = gameLevels[0].name;

        // Public functions
        return {
            getGameLevels     : getGameLevels,
            getActiveGameLevel: getActiveGameLevel,
            setActiveGameLevel: setActiveGameLevel
        };

        function getGameLevels() {
            return gameLevels;
        }

        function getActiveGameLevel(secondIa) {

            // Default value
            if (Methods.isNullOrEmpty(secondIa)) {
                secondIa = false;
            }

            var i, length;
            if (secondIa) {
                for (i = 0, length = gameLevels.length; i < length; i++) {
                    if (activeGameLevel2 == gameLevels[i].name) {
                        return gameLevels[i];
                    }
                }
            }
            else {
                for (i = 0, length = gameLevels.length; i < length; i++) {
                    if (activeGameLevel == gameLevels[i].name) {
                        return gameLevels[i];
                    }
                }
            }
            return null;
        }

        function setActiveGameLevel(gameLevelName, secondIa) {

            // Default value
            if (Methods.isNullOrEmpty(secondIa)) {
                secondIa = false;
            }

            if (secondIa) {
                activeGameLevel2 = gameLevelName;
                $rootScope.$broadcast('gameLevels:newActiveGameLevel2', {
                    activeGameLevel2: getActiveGameLevel(true)
                });
            }
            else {
                activeGameLevel = gameLevelName;
                $rootScope.$broadcast('gameLevels:newActiveGameLevel', {
                    activeGameLevel: getActiveGameLevel(false)
                });
            }
        }
    }

})(window.angular);

