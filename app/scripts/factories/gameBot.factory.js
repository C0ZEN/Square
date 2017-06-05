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

        // Public functions
        return {
            playOnEasy: playOnEasy
        };

        // Easy bot, full random
        function playOnEasy(grid, currentPlayer) {

            // Get the range of the grid
            var rowLength    = grid.length;
            var columnLength = grid[0].columns.length;
            var currentRow, currentColumn, direction, isSelected;

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
    }

})(window.angular);

