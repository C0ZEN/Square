(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gameGrid', gameGrid);

    gameGrid.$inject = [
        'rfc4122',
        'gameLevels'
    ];

    function gameGrid(rfc4122, gameLevels) {

        // Private data
        var grid;

        // Public functions
        return {
            createGrid        : createGrid,
            getGrid           : getGrid,
            selectGridElement : selectGridElement,
            autoCompleteSquare: autoCompleteSquare
        };

        function createGrid(rowsQuantity, columnsQuantity) {
            grid = [];

            // Populate the rows array
            for (var i = 0; i < rowsQuantity; i++) {
                grid.push({
                    id     : i,
                    columns: []
                });

                // Populate the columns array
                for (var y = 0; y < columnsQuantity; y++) {
                    grid[i].columns.push({
                        id                   : y,
                        barHorizontalUuid    : rfc4122.v4(),
                        barVerticalUuid      : rfc4122.v4(),
                        barHorizontalSelected: false,
                        barVerticalSelected  : false,
                        barHorizontalColor   : '',
                        barVerticalColor     : '',
                        squareCompleted      : false,
                        squareCompletedColor : ''
                    });
                }
            }
            return grid;
        }

        function getGrid() {
            return grid;
        }

        function selectGridElement(rowId, columnId, direction, currentPlayer) {
            for (var row = 0, rowLength = grid.length; row < rowLength; row++) {
                if (rowId == grid[row].id) {
                    for (var column = 0, columnLength = grid[row].columns.length; column < columnLength; column++) {
                        if (columnId == grid[row].columns[column].id) {
                            if (direction == 'horizontal') {
                                grid[row].columns[column].barHorizontalSelected = currentPlayer.name;
                                grid[row].columns[column].barHorizontalColor    = currentPlayer.color;
                            }
                            else {
                                grid[row].columns[column].barVerticalSelected = currentPlayer.name;
                                grid[row].columns[column].barVerticalColor    = currentPlayer.color;
                            }
                            var canReplay = autoCompleteSquare(currentPlayer);
                            return {
                                grid     : grid,
                                canReplay: canReplay
                            }
                        }
                    }
                }
            }
        }

        function autoCompleteSquare(currentPlayer) {
            for (var row = 0, rowLength = grid.length; row < rowLength; row++) {
                for (var column = 0, columnLength = grid[row].columns.length; column < columnLength; column++) {

                    // Check if the square is completed
                    if (!grid[row].columns[column].squareCompleted) {

                        // All bars of this column are selected
                        if (grid[row].columns[column].barHorizontalSelected != false && grid[row].columns[column].barVerticalSelected != false) {

                            // Check if this is not the last column
                            // Check if the next column have an vertical bar selected
                            if (column + 1 < columnLength && grid[row].columns[column + 1].barVerticalSelected != false) {

                                // Check if the next row exist
                                // Check if the column of the next row have an horizontal bar selected
                                if (row + 1 < rowLength && grid[row + 1].columns[column].barHorizontalSelected != false) {

                                    // Update the square data
                                    grid[row].columns[column].squareCompleted      = currentPlayer.name;
                                    grid[row].columns[column].squareCompletedColor = currentPlayer.color;
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }
    }

})(window.angular);

