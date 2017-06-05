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
        var gameLevels      = [
            {
                id   : '1',
                name : 'very-easy',
                image: 'images/icons8/nolan/64/Baby.png',
                label: 'LEVELS.VERY_EASY'
            },
            {
                id   : '2',
                name : 'easy',
                image: 'images/icons8/nolan/64/Babys-Room.png',
                label: 'LEVELS.EASY'
            },
            {
                id   : '3',
                name : 'medium',
                image: 'images/icons8/nolan/64/Sad.png',
                label: 'LEVELS.MEDIUM'
            },
            {
                id   : '4',
                name : 'hard',
                image: 'images/icons8/nolan/64/Skull.png',
                label: 'LEVELS.HARD'
            }
        ];
        var activeGameLevel = gameLevels[0].name;

        // Public functions
        return {
            getGameLevels     : getGameLevels,
            getActiveGameLevel: getActiveGameLevel,
            setActiveGameLevel: setActiveGameLevel
        };

        function getGameLevels() {
            return gameLevels;
        }

        function getActiveGameLevel() {
            for (var i = 0, length = gameLevels.length; i < length; i++) {
                if (activeGameLevel == gameLevels[i].name) {
                    return gameLevels[i];
                }
            }
            return null;
        }

        function setActiveGameLevel(gameLevelName) {
            if (activeGameLevel != gameLevelName) {
                activeGameLevel = gameLevelName;
                $rootScope.$broadcast('gameLevels:newActiveGameLevel', {
                    activeGameLevel: getActiveGameLevel()
                });
            }
        }
    }

})(window.angular);

