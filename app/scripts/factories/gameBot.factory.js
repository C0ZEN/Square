(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gameBot', gameBot);

    gameBot.$inject = [
        'gameGrid',
        'cozenEnhancedLogs',
        'CONFIG'
    ];

    function gameBot(gameGrid, cozenEnhancedLogs, CONFIG) {

        // Private methods
        var methods = {
            setGridRange: setGridRange
        };

        // Private data
        var rowLength, columnLength;
        var currentRow, currentColumn, direction, isSelected;

        // Public functions
        return {
            playOnVeryEasy: playOnVeryEasy,
            playOnEasy    : playOnEasy,
            playOnMedium  : playOnMedium
        };

        // Easy bot, full random
        function playOnVeryEasy(grid, currentPlayer) {
            methods.setGridRange(grid);

            // Find a proper element to select
            do {
                isSelected = true;

                // Select a random row, column and direction
                currentRow    = Methods.getRandomFromRange(0, rowLength - 1);
                currentColumn = Methods.getRandomFromRange(0, columnLength - 1);
                direction     = Methods.getRandomFromRange(0, 1) == 0 ? 'horizontal' : 'vertical';

                // Specific case to avoid error when getting invisible bar
                if (currentRow == rowLength - 1 && direction == 'vertical') {
                    isSelected = false;
                }
                else if (currentColumn == columnLength - 1 && direction == 'horizontal') {
                    isSelected = false;
                }

                // Check if the random bar is free or not
                else if (gameGrid.isElementSelected(currentRow, currentColumn, direction)) {
                    isSelected = false;
                }
            } while (!isSelected);

            // Select the element
            if (CONFIG.debug) {
                cozenEnhancedLogs.info.customMessageEnhanced('gameBot', currentPlayer.name + ' played on', currentRow + ',' + currentColumn, 'in ' + direction);
            }
            return gameGrid.selectGridElement(currentRow, currentColumn, direction, currentPlayer);
        }

        // Medium bot, full random but try to finish square
        function playOnEasy(grid, currentPlayer) {
            methods.setGridRange(grid);

            // Find a proper element to select
            do {
                var horizontalAvailable = false, verticalAvailable = false;
                isSelected              = true;

                // Select a random row, column and direction
                currentRow    = Methods.getRandomFromRange(0, rowLength - 1);
                currentColumn = Methods.getRandomFromRange(0, columnLength - 1);
                direction     = 'vertical';

                // Specific case to avoid error when getting invisible bar
                if (currentRow == rowLength - 1 && direction == 'vertical') {
                    isSelected = false;
                }

                // Check if the random bar is free or not
                else if (gameGrid.isElementSelected(currentRow, currentColumn, direction)) {
                    isSelected = false;
                }

                // So here we can say that the vertical bar is available
                if (isSelected) {
                    verticalAvailable = true;
                }
                isSelected = true;
                direction  = 'horizontal';

                // Specific case to avoid error when getting invisible bar
                if (currentColumn == columnLength - 1 && direction == 'horizontal') {
                    isSelected = false;
                }

                // Check if the random bar is free or not
                else if (gameGrid.isElementSelected(currentRow, currentColumn, direction)) {
                    isSelected = false;
                }

                // So here we can say that the horizontal bar is available
                if (isSelected) {
                    horizontalAvailable = true;
                }

                // So we can manually force to stop, we have at least one good spot
                if (verticalAvailable || horizontalAvailable) {
                    isSelected = true;

                    // Both available, we need to find the best one
                    if (verticalAvailable && horizontalAvailable) {

                        // Calc the best
                        var verticalScore   = gameGrid.howManyScore(currentRow, currentColumn, 'vertical', currentPlayer);
                        var horizontalScore = gameGrid.howManyScore(currentRow, currentColumn, 'horizontal', currentPlayer);
                        console.log(verticalScore, horizontalScore);

                        // Edit direction to select the best
                        if (verticalScore > horizontalScore) {
                            direction = 'vertical';
                        }
                        else {
                            direction = 'horizontal';
                        }
                    }
                    else if (verticalAvailable) {
                        direction = 'vertical';
                    }
                    else {
                        direction = 'horizontal';
                    }
                }
            } while (!isSelected);

            // Select the element
            if (CONFIG.debug) {
                cozenEnhancedLogs.info.customMessageEnhanced('gameBot', currentPlayer.name + ' played on', currentRow + ',' + currentColumn, 'in ' + direction);
            }
            return gameGrid.selectGridElement(currentRow, currentColumn, direction, currentPlayer);
        }

        function playOnMedium() {

        }

        /// INTERNAL METHODS ///

        // Get the range of the grid
        function setGridRange(grid) {
            rowLength    = grid.length;
            columnLength = grid[0].columns.length;
        }
    }

})(window.angular);

