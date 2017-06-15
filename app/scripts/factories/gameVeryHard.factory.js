(function (angular) {
    'use strict';

    angular
        .module('squareApp')
        .factory('gameVeryHard', gameVeryHard);

    gameVeryHard.$inject = [];

    function gameVeryHard() {

        // Public functions
        return {
            newState: newState,
            newNode: newNode,
            newTree: newTree
        };

        // Square constructor
        function newSquare() {
            var Square = function() {
                this.up = 0;
                this.down = 0;
                this.left = 0;
                this.right = 0;
                this.player = null; // Player who scores by completing the square
            };
            Square.prototype.completeness = function () {
                return this.up + this.down + this.left + this.down;
            };
            return Square;
        }

        // State constructor
        function newState(grid, currentPlayer) {
            var State = function(grid, currentPlayer) {
                this.board = [];
                this.player = currentPlayer; // Next player to play

                // Convert Geoffrey's grid to a squares matrice
                var height = grid.length;
                var width = grid[0].length;
                for(var i=0; i<height; i++) {
                    this.board[i] = new Array(len);
                    for(var j=0; j<width; j++) {
                        this.board[i][j] = newSquare();
                    }
                }
                // Set already played segments
                for(var i=0; i<height-1; i++) {
                    for(var j=0; j<width-1; j++) {
                        if(grid[i].columns[j].barHorizontalSelected != false) {
                            this.board[i][j].up = 1;
                        }
                        if(grid[i].columns[j].barVerticalSelected != false) {
                            this.board[i][j].left = 1;
                        }
                        if(heightgrid[i+1].columns[j].barHorizontalSelected != false) {
                            this.board[i][j].down = 1;
                        }
                        if(grid[i].columns[j+1].barVerticalSelected != false) {
                            this.board[i][j].right = 1;
                        }
                    }
                }
            };
            // Check if game is over (no empty square's segment)
            State.prototype.isTerminal = function() {
                var height = this.board.length;
                var width = this.board[0].length;
                for(var i=0; i<height; i++) {
                    for(var j=0; j<width; j++) {
                        if(this.board[i][j].completeness != 4) {
                            return false;
                        }
                    }
                }
                return true;
            };
            // Check available segment
            State.prototype.isAvailable = function() {
                var height = this.board.length;
                var width = this.board[0].length;
                var availableMoves = [];
                for(var i=0; i<height; i++) {
                    for(var j=0; j<width; j++) {
                        if(this.board[i][j].completeness != 4) {
                            var nextState = newState();
                            // Simulate a move
                            if(this.board[i][j].up == 0) {
                                this.board[i][j].up = 1;
                            }
                            else if(this.board[i][j].down == 0) {
                                this.board[i][j].down = 1;
                            }
                            else if(this.board[i][j].right == 0) {
                                this.board[i][j].right = 1;
                            }
                            else {
                                this.board[i][j].left = 1;
                            }
                            availableMoves.push(this);
                        }
                    }
                }
                return availableMoves;
            };
            return State;
        }

        // Node constructor
        function newNode(state) {
            var Node = function(state) {
                this.parent = null;
                this.children = [];
                this.data = state;
                this.score = 0;
            };
            // Get the AI evaluation score
            Node.prototype.setScore = function() {
                // Check for square to complete
                var stop = false;
                for(var i=0; stop && i<oldOrLen; i++) {
                    for(var j=0; j<oldOrLen; j++) {
                        if(this.data.board[i][j].completeness == 3) {
                            this.score = 1000;
                            stop = true;
                            break;
                        }
                    }
                }
                // Check for playing 2th segment
                var stop = false;
                for(var i=0; stop && i<oldOrLen; i++) {
                    for(var j=0; j<oldOrLen; j++) {
                        if(this.data.board[i][j].completeness == 2) {
                            this.score = 100;
                            stop = true;
                            break;
                        }
                    }
                }
                // Check for playing 1th segment
                var stop = false;
                for(var i=0; stop && i<oldOrLen; i++) {
                    for(var j=0; j<oldOrLen; j++) {
                        if(this.data.board[i][j].completeness == 2) {
                            this.score = 10;
                            stop = true;
                            break;
                        }
                    }
                }
                // Check for playing 3th segment
                var stop = false;
                for(var i=0; stop && i<oldOrLen; i++) {
                    for(var j=0; j<oldOrLen; j++) {
                        if(this.data.board[i][j].completeness == 2) {
                            this.score = 1;
                            stop = true;
                            break;
                        }
                    }
                }
            };
            return Node;
        }

        // Tree constructor
        function newTree(initialState) {
            var Tree = function(initialState) {
                this.root = newNode(initialState);
            };
            // Get best value from our custom negamax + alphaBeta
            Tree.prototype.customMiniMax = function(node, alpha, beta, maximisingPlayer) {
                var bestValue;
                // Recursive base case
                if (node.children.length === 0) {
                    bestValue = node.data;
                }
                // Max node
                else if (maximisingPlayer) {
                    bestValue = alpha;
                    // Recurse for all children
                    for (var i=0, c=node.children.length; i<c; i++) {
                        var childValue = customMiniMax(node.children[i], bestValue, beta, false);
                        bestValue = Math.max(bestValue, childValue);
                        // Beta cut off
                        if (beta <= bestValue) {
                            break;
                        }
                    }
                }
                // Min node
                else {
                    bestValue = beta;
                    // Recurse for all children
                    for (var i=0, c=node.children.length; i<c; i++) {
                        var childValue = customMiniMax(node.children[i], alpha, bestValue, true);
                        bestValue = Math.min(bestValue, childValue);
                        // Alfa cut off
                        if (bestValue <= alpha) {
                            break;
                        }
                    }
                }
                return bestValue;
            };
            return Tree;
        }

    }

})(window.angular);
