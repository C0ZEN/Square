(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gameGrid', gameGrid);

    gameGrid.$inject = [
        'rfc4122',
        'gamePlayers'
    ];

    function gameGrid(rfc4122, gamePlayers) {

        // Private data
        var grid;

        // Public functions
        return {
            createGrid        : createGrid,
            getGrid           : getGrid,
            selectGridElement : selectGridElement,
            autoCompleteSquare: autoCompleteSquare,
            isElementSelected : isElementSelected,
            howManyScore      : howManyScore,
            countScore        : countScore,
            isSquareAvailable : isSquareAvailable,
            findTheBestSquare : findTheBestSquare
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

        function selectGridElement(rowId, columnId, direction, currentPlayer, customGrid) {
            if (Methods.isNullOrEmpty(customGrid)) {
                customGrid = grid;
            }
            for (var row = 0, rowLength = customGrid.length; row < rowLength; row++) {
                if (rowId == customGrid[row].id) {
                    for (var column = 0, columnLength = customGrid[row].columns.length; column < columnLength; column++) {
                        if (columnId == customGrid[row].columns[column].id) {
                            if (direction == 'horizontal') {
                                customGrid[row].columns[column].barHorizontalSelected = currentPlayer.name;
                                customGrid[row].columns[column].barHorizontalColor    = currentPlayer.color;
                            }
                            else {
                                customGrid[row].columns[column].barVerticalSelected = currentPlayer.name;
                                customGrid[row].columns[column].barVerticalColor    = currentPlayer.color;
                            }
                            return {
                                grid     : customGrid,
                                canReplay: autoCompleteSquare(currentPlayer),
                                bar      : {
                                    row      : row,
                                    column   : column,
                                    direction: direction
                                }
                            }
                        }
                    }
                }
            }
        }

        function autoCompleteSquare(currentPlayer, forceReplay) {

            // Default value for forceReplay
            if (Methods.isNullOrEmpty(forceReplay)) {
                forceReplay = false;
            }

            // Start to search for a square to complete
            for (var row = 0, rowLength = grid.length; row < rowLength; row++) {
                for (var column = 0, columnLength = grid[row].columns.length; column < columnLength; column++) {

                    // Check if the square is completed
                    if (!grid[row].columns[column].squareCompleted) {

                        // All bars of this column are not selected
                        if (grid[row].columns[column].barHorizontalSelected != false && grid[row].columns[column].barVerticalSelected != false) {

                            // Check if this is not the last column
                            // Check if the next column have an vertical bar selected
                            if (column + 1 < columnLength && grid[row].columns[column + 1].barVerticalSelected != false) {

                                // Check if the next row exist
                                // Check if the column of the next row have an horizontal bar selected
                                if (row + 1 < rowLength && grid[row + 1].columns[column].barHorizontalSelected != false) {

                                    // Select the square by updating the square data
                                    grid[row].columns[column].squareCompleted      = currentPlayer.name;
                                    grid[row].columns[column].squareCompletedColor = currentPlayer.color;

                                    // Increase the score
                                    gamePlayers.increaseScore(currentPlayer.name);

                                    // Then check again if we can create another square
                                    return autoCompleteSquare(currentPlayer, true);
                                }
                            }
                        }
                    }
                }
            }
            return forceReplay;
        }

        function isElementSelected(rowId, columnId, direction) {
            if (direction == 'horizontal') {
                return grid[rowId].columns[columnId].barHorizontalSelected != false;
            }
            else {
                return grid[rowId].columns[columnId].barVerticalSelected != false;
            }
        }

        function howManyScore(rowId, columnId, direction, currentPlayer) {
            var fakeGrid = angular.copy(grid);

            // Search for the element in the fake grid
            for (var row = 0, rowLength = fakeGrid.length; row < rowLength; row++) {
                if (rowId == fakeGrid[row].id) {
                    for (var column = 0, columnLength = fakeGrid[row].columns.length; column < columnLength; column++) {
                        if (columnId == fakeGrid[row].columns[column].id) {

                            // Edit the fake grid
                            if (direction == 'horizontal') {
                                fakeGrid[row].columns[column].barHorizontalSelected = currentPlayer.name;
                                fakeGrid[row].columns[column].barHorizontalColor    = currentPlayer.color;
                            }
                            else {
                                fakeGrid[row].columns[column].barVerticalSelected = currentPlayer.name;
                                fakeGrid[row].columns[column].barVerticalColor    = currentPlayer.color;
                            }

                            // Return the score
                            return countScore(currentPlayer, 0, fakeGrid);
                        }
                    }
                }
            }
        }

        function countScore(currentPlayer, score, fakeGrid) {

            // Start to search for a square to complete
            for (var row = 0, rowLength = fakeGrid.length; row < rowLength; row++) {
                for (var column = 0, columnLength = fakeGrid[row].columns.length; column < columnLength; column++) {

                    // Check if the square is completed
                    if (!fakeGrid[row].columns[column].squareCompleted) {

                        // All bars of this column are selected
                        if (fakeGrid[row].columns[column].barHorizontalSelected != false && fakeGrid[row].columns[column].barVerticalSelected != false) {

                            // Check if this is not the last column
                            // Check if the next column have an vertical bar selected
                            if (column + 1 < columnLength && fakeGrid[row].columns[column + 1].barVerticalSelected != false) {

                                // Check if the next row exist
                                // Check if the column of the next row have an horizontal bar selected
                                if (row + 1 < rowLength && fakeGrid[row + 1].columns[column].barHorizontalSelected != false) {

                                    // Select the square by updating the square data
                                    fakeGrid[row].columns[column].squareCompleted      = currentPlayer.name;
                                    fakeGrid[row].columns[column].squareCompletedColor = currentPlayer.color;

                                    // Increase the score
                                    ++score;

                                    // Then check again if we can create another square
                                    countScore(currentPlayer, score, fakeGrid);
                                }
                            }
                        }
                    }
                }
            }
            return score;
        }

        function isSquareAvailable(customGrid) {
            if (Methods.isNullOrEmpty(customGrid)) {
                customGrid = grid;
            }

            // Start to search for a square to complete
            for (var row = 0, rowLength = customGrid.length; row < rowLength; row++) {
                for (var column = 0, columnLength = customGrid[row].columns.length; column < columnLength; column++) {

                    // Check if the square not completed
                    if (!customGrid[row].columns[column].squareCompleted) {

                        // Check if all the bar of this square are selected
                        if (customGrid[row].columns[column].barHorizontalSelected && customGrid[row].columns[column].barVerticalSelected) {

                            // Check if this is not the last column
                            if (column + 1 < columnLength) {

                                // Check if the next column have an vertical bar selected
                                if (customGrid[row].columns[column + 1].barVerticalSelected) {

                                    // Check if the next row exist
                                    // Check if the column of the next row have an horizontal bar selected
                                    if (row + 1 < rowLength && customGrid[row + 1].columns[column].barHorizontalSelected == false) {

                                        // Then you can select one square !
                                        return {
                                            row      : row + 1,
                                            column   : column,
                                            direction: 'horizontal'
                                        };
                                    }
                                }
                                else {

                                    // Check if the next row exist
                                    // Check if the column of the next row have an horizontal bar selected
                                    if (row + 1 < rowLength && customGrid[row + 1].columns[column].barHorizontalSelected) {

                                        // Then you can select one square !
                                        return {
                                            row      : row,
                                            column   : column + 1,
                                            direction: 'vertical'
                                        };
                                    }
                                }
                            }
                        }
                        else if (customGrid[row].columns[column].barHorizontalSelected && !customGrid[row].columns[column].barVerticalSelected) {

                            // Check if this is not the last column
                            if (column + 1 < columnLength) {

                                // Check if the next column have an vertical bar selected
                                if (customGrid[row].columns[column + 1].barVerticalSelected) {

                                    // Check if the next row exist
                                    // Check if the column of the next row have an horizontal bar selected
                                    if (row + 1 < rowLength && customGrid[row + 1].columns[column].barHorizontalSelected) {

                                        // Then you can select one square !
                                        return {
                                            row      : row,
                                            column   : column,
                                            direction: 'vertical'
                                        };
                                    }
                                }
                            }
                        }
                        else if (!customGrid[row].columns[column].barHorizontalSelected && customGrid[row].columns[column].barVerticalSelected) {

                            // Check if this is not the last column
                            if (column + 1 < columnLength) {

                                // Check if the next column have an vertical bar selected
                                if (customGrid[row].columns[column + 1].barVerticalSelected) {

                                    // Check if the next row exist
                                    // Check if the column of the next row have an horizontal bar selected
                                    if (row + 1 < rowLength && customGrid[row + 1].columns[column].barHorizontalSelected) {

                                        // Then you can select one square !
                                        return {
                                            row      : row,
                                            column   : column,
                                            direction: 'horizontal'
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }

        function findTheBestSquare() {

        }
    }

})(window.angular);

