(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gameBot', gameBot);

    gameBot.$inject = [
        'gameGrid',
        'cozenEnhancedLogs',
        'CONFIG',
        'gameVeryHard'
    ];

    function gameBot(gameGrid, cozenEnhancedLogs, CONFIG, gameVeryHard) {

        // Private methods
        var methods = {
            setGridRange  : setGridRange,
            selectElement : selectElement,
            setCurrentData: setCurrentData
        };

        // Private data
        var rowLength, columnLength;
        var currentRow, currentColumn, direction, isSelected;

        // Public functions
        return {
            playOnVeryEasy: playOnVeryEasy,
            playOnEasy    : playOnEasy,
            playOnMedium  : playOnMedium,
            playOnHard    : playOnHard,
            playOnVeryHard: playOnVeryHard
        };

        // Very easy bot, full random
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

        // Easy bot, almost full random but select the direction that give the better score
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

        // Medium, try to finish an existing square, if not possible, go on very easy
        function playOnMedium(grid, currentPlayer) {
            var availableSquare = gameGrid.isSquareAvailable();

            // The bot can select an element to create a square
            if (availableSquare != false) {

                // Select the element
                if (CONFIG.debug) {
                    cozenEnhancedLogs.info.customMessageEnhanced('gameBot', currentPlayer.name + ' played on', currentRow + ',' + currentColumn, 'in ' + direction);
                }
                return gameGrid.selectGridElement(availableSquare.row, availableSquare.column, availableSquare.direction, currentPlayer);
            }
            else {
                return playOnVeryEasy(grid, currentPlayer);
            }
        }

        // Hard, try to finish an existing square, if not possible, try to find a placement where you don't offer square to opponent
        function playOnHard(grid, currentPlayer) {
            var availableSquare = gameGrid.isSquareAvailable();

            // The bot can select an element to create a square
            if (availableSquare != false) {

                // Select the element
                if (CONFIG.debug) {
                    cozenEnhancedLogs.info.customMessageEnhanced('gameBot', currentPlayer.name + ' played on', currentRow + ',' + currentColumn, 'in ' + direction);
                }
                return gameGrid.selectGridElement(availableSquare.row, availableSquare.column, availableSquare.direction, currentPlayer);
            }
            else {
                methods.setGridRange(grid);

                // For each row and column
                var availableElements = [], fakeGrid = angular.copy(grid), selectGridElementReturn;
                for (var row = 0, rowLength = fakeGrid.length; row < rowLength; row++) {
                    for (var column = 0, columnLength = fakeGrid[row].columns.length; column < columnLength; column++) {

                        // Check if we can select the vertical element
                        if (row < rowLength - 1 && !gameGrid.isElementSelected(row, column, 'vertical')) {
                            fakeGrid = angular.copy(grid);

                            // Select it
                            selectGridElementReturn = gameGrid.selectGridElement(row, column, 'vertical', currentPlayer, fakeGrid);
                            fakeGrid                = selectGridElementReturn.grid;

                            // Now simulate next turn and try to complete a square
                            availableSquare = gameGrid.isSquareAvailable(fakeGrid);

                            // If false, consider the element as good because we can't provide a point to next player
                            if (!availableSquare) {
                                availableElements.push({
                                    row      : row,
                                    column   : column,
                                    direction: 'vertical'
                                });
                            }
                        }

                        // Check if we can select the vertical element
                        if (column < columnLength - 1 && !gameGrid.isElementSelected(row, column, 'horizontal')) {
                            fakeGrid = angular.copy(grid);

                            // Select it
                            selectGridElementReturn = gameGrid.selectGridElement(row, column, 'horizontal', currentPlayer, fakeGrid);
                            fakeGrid                = selectGridElementReturn.grid;

                            // Now simulate next turn and try to complete a square
                            availableSquare = gameGrid.isSquareAvailable(fakeGrid);

                            // If false, consider the element as good because we can't provide a point to next player
                            if (!availableSquare) {
                                availableElements.push({
                                    row      : row,
                                    column   : column,
                                    direction: 'horizontal'
                                });
                            }
                        }
                    }
                }
                cozenEnhancedLogs.info.customMessageEnhanced('gameBot', 'Found', availableElements.length, 'safe solutions');

                // If we can play safe
                if (availableElements.length > 0) {
                    var index           = Methods.getRandomFromRange(0, availableElements.length - 1);
                    var selectedElement = availableElements[index];
                    return gameGrid.selectGridElement(selectedElement.row, selectedElement.column, selectedElement.direction, currentPlayer);
                }

                // If no proper solution, play on very easy
                return playOnVeryEasy(grid, currentPlayer);
            }
        }

        function playOnVeryHard(grid, currentPlayer) {
            // Set current state
            var state = gameVeryHard.newState(grid, currentPlayer);
            // Create Tree
            var tree = gameVeryHard.newTree(state);
            // Populate tree with available moves to 4 generations
            for(var x=0; i<4; i++) {
                var previousNode;
                if(x == 0) {
                    previousNode = tree.root;
                } else {
                    previousNode = tree.root.children[x]
                }
                var availableMoves = state.isAvailable();
                availableMoves.forEach(function(nextState) {
                    // Create node with correct state
                    var node = gameVeryHard.newNode(nextState);
                    node.parent = previousNode;
                    node.setScore();
                    node.parent.children.push(node);
                });
            }
            // Apply our minimax algorithm
            var bestValue = tree.customMiniMax(tree.root, -Number.MAX_VALUE, Number.MAX_VALUE, true);
            // Get 1st Gen node with this bestValue
            var bestMoveNode;
            tree.root.children.forEach(function(childNode) {
                if(childNode.score == bestValue) {
                    bestMoveNode = childNode;
                }
            });
            // Get the segment coords
            var h = bestMoveNode.data.board.length;
            var w = bestMoveNode.data.board[0].length;
            var row, column, direction;
            var goOn = true;
            for(var i=0; goOn && i<h; i++) {
                for(var i=0; i<w; i++) {
                    if(state.board[i][j].up != bestMoveNode.data.board[i][j].up) {
                        row = i; column = j; direction = 'horizontal';
                        goOn = false; break;
                    }
                    if(state.board[i][j].down != bestMoveNode.data.board[i][j].down) {
                        row = i+1; column = j; direction = 'horizontal';
                        goOn = false; break;
                    }
                    if(state.board[i][j].left != bestMoveNode.data.board[i][j].left) {
                        row = i; column = j; direction = 'vertical';
                        goOn = false; break;
                    }
                    if(state.board[i][j].right != bestMoveNode.data.board[i][j].right) {
                        row = i; column = j+1; direction = 'vertical';
                        goOn = false; break;
                    }
                }
            }
            // PLAY
            return gameGrid.selectGridElement(row, column, direction, currentPlayer);
        }
        

        /// INTERNAL METHODS ///

        // Get the range of the grid
        function setGridRange(grid) {
            rowLength    = grid.length;
            columnLength = grid[0].columns.length;
        }

        function selectElement(currentPlayer) {
            if (CONFIG.debug) {
                cozenEnhancedLogs.info.customMessageEnhanced('gameBot', currentPlayer.name + ' played on', currentRow + ',' + currentColumn, 'in ' + direction);
            }
            return gameGrid.selectGridElement(currentRow, currentColumn, direction, currentPlayer);
        }

        function setCurrentData(newRow, newColumn, newDirection) {
            currentRow    = newRow;
            currentColumn = newColumn;
            direction     = newDirection;
        }
    }

})(window.angular);
