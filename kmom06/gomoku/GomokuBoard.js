

/* jshint ignore:start */
<<<<<<< HEAD
// jscs:disable
=======

>>>>>>> 4ea76b5d41b436f0964e8f18bd02120fc8d84a61
/**
 * Class for Gomoku board.
 *
 */
class GomokuBoard {
<<<<<<< HEAD

=======
    
>>>>>>> 4ea76b5d41b436f0964e8f18bd02120fc8d84a61
    /**
     * Constructor.
     *
     */
    constructor() {
        this.player1 = "Player 1";
        this.player2 = "Player 2";
        this.marker = ["_", "X", "O"];
        this.clear();
    }



    /**
     * Clear the board.
     *
     */
    clear() {
        this.board = [];
        this.player = 0;
        this.size = null;
    }



    /**
     * Prepare the game by creating an empty board of the specified size.
     *
     * @param  Integer size Inital size on the gameboard.
     *
     * @throws Error size is not within 10-99.
     *
     */
    start(size = 20) {
        this.clear();

        if (size < 10 || size > 99) {
            throw new Error("Unsupported size.");
        }

        this.size = size;
        this.player = 1;
        this.board = [];
        this.board.length = this.size * this.size;
        this.board.fill(0);
    }



    /**
     * Add a move to the board for the player whos next in turn.
     *
     * @param  Integer x Where to place the mark 0-(size-1).
     * @param  Integer y Where to place the mark 0-(size-1).
     *
     * @throws Error if x and y is outside the boards.
     * @throws Error if the position is already taken.
     *
     */
    place(x, y) {
        var position = this.getPosition(x, y);

        if (this.isTaken(position)) {
            throw new Error("The position is already taken.");
        }

        this.placeMarker(position);
        this.nextPlayer();

    }
    //check if the move wins
    isWon(x, y) {
        var x_diff = (x >= 5) ? 5 : x;
        var y_diff = (y >= 5) ? 5 : y;
        var count = 0;
        var j = 0;
        var i = 0;
        var extra = 0;
        var diff = 0;
        var marker = (this.player === 1) ? 2 : 1;
        console.log(`Placed ${x}, ${y} with ${marker}`);
        console.log("Testing horizontally!");
        for (var i = x - x_diff; i !== x + 1; i++) { // jshint ignore:line
            count = 0; // jshint ignore:line
            console.log("Looping");
            for (var j = i; j !== i + 5; j++) { // jshint ignore:line
                if (this.board[this.getPosition(j, y)] === marker) {
                    count++; // jshint ignore:line
                    if (count === 5) {
                        return `Player ${marker} has won!`;
                    }
                } else {
                    count = 0; // jshint ignore:line
                    break;
                }
            }
        }
        console.log("Testing vertically!");
        for (i = y - y_diff; i !== y + 1; i++) { // jshint ignore:line
            count = 0; // jshint ignore:line
            console.log("Looping");
            for (j = i; j !== i + 5; j++) { // jshint ignore:line
                if (this.board[this.getPosition(x, j)] === marker) { // jshint ignore:line
                    count++;
                    if (count === 5) {
                        return `Player ${marker} has won!`;
                    }
                } else {
                    count = 0;
                    break;
                }
            }
        }
        //var tmp_y = (x_diff >= 5)  ? x_diff : y_diff;
        //var tmp_x = (tmp_y  >=  5) ? tmp_y  : x_diff;
        var iteration = 0;
        console.log("Testing first diagonal!");
        for (i = x - x_diff; i !== x + 1; i++) {
            count = 0;
            var extra = 0;
            for (j = i; j !== i + 5; j++) {
                var diff = (((y - x_diff) + iteration + extra) < this.size) ? this.size : ((y + x_diff) - iteration - extra);
                if (diff >= 0 && diff < this.size) {
                    if (this.board[this.getPosition(j, diff)] === marker) {
                        count++;
                        extra++;
                        if (count === 5) {
                            return `Player ${marker} has won!`;
                        }
                    } else {
                        extra = 0;
                        count = 0;
                        break;
                    }
                }
            }
            iteration++;
        }

        iteration = 0;
        console.log("Testing second diagonal!");
        for (i = x - x_diff; i !== x + 1; i++) {
            count = 0;
            extra = 0;
            console.log(`Testing x ${i}`);
            for (j = i; j !== i + 5; j++) {
                diff = (((y + x_diff) - iteration - extra) > this.size) ? this.size : ((y + x_diff) - iteration - extra);
                console.log(`Running ${j}, ${diff}. Looking for ${marker}`);
                if (diff >= 0 && diff < this.size) {
                    if (this.board[this.getPosition(j, diff)] === marker) {
                        count++;
                        extra++;
                        if (count === 5) {
                            return `Player ${marker} has won!`;
                        }
                    } else {
                        extra = 0;
                        count = 0;
                        break;
                    }}
            }
            iteration++;
        }

        return "No winning player.";
    }


    /**
     * Get the current size of the board.
     *
     * @return Integer | null
     *
     */
    getSize() {
        return this.size;
    }



    /**
     * Check if position is taken.
     *
     * @param  Integer position to check.
     *
     * @return true | false
     *
     */
    isTaken(position) {
        return (this.board[position] === 0) ? false : true;
    }



    /**
     * Check if position is taken.
     *
     * @param  Integer x Where to place the mark 0-(size-1).
     * @param  Integer y Where to place the mark 0-(size-1).
     *
     * @throws Error if x and y is outside the boards.
     *
     * @return true | false
     *
     */
    isPositionTaken(x, y) {
        return this.isTaken(this.getPosition(x, y));
    }



    /**
     * Check if position is within the board and return its internal position.
     *
     * @param  Integer x Where to check 0-(size-1).
     * @param  Integer y Where to check 0-(size-1).
     *
     * @throws Error if x and y is outside the boards.
     *
     * @return Integer as internal board position.
     */
    getPosition(x, y) {
        if (x < 0 || x > this.size || y < 0 || y > this.size) {
            throw new Error("Position is outside of the board.");
        }

        return x + y * this.size;
    }

    // getPositionMarker() {
    //     return this.board[getPosition];
    // }

    /**
     * Check if there is a free place to put a marker or if the board is full.
     *
     * @return true | false
     *
     */
    isFull() {
        return this.board.every((currentValue) => {
            return currentValue !== 0;
        });
    }

    placeRandom() {
        var move = this.advanced_random();
        console.log("Trying to place: " + move);
        this.place(move[0], move[1]);
    }
    advanced_random() {
        console.log("I've entered");
        var best_move  = [5, 5];
        var best_score = 0;
        var player_marker = (this.player === 1) ? 2 : 1;
        for (let col = 0; col < this.size - 1; col++) {
            for (var row = 0; row < this.size - 1; row++) {

                var this_score = 0;
                var this_position = [col, row];

                if (!this.isPositionTaken(col, row)) {
                    if (col > 0 && this.board[this.getPosition(col - 1, row)] !== 0) { // can go left?
                        var left_marker = this.board[this.getPosition(col -1, row)];
                        console.log("Checking left for: " + left_marker);
                        for (var i = col - 1; i !== 0; i--) { //going left first
                            if (this.board[this.getPosition(i, row)] === left_marker) {
                                if (left_marker === player_marker) {
                                    this_score += 2;
                                } else {
                                    this_score += 1;
                                }
                            } else {
                                break;
                            }
                        }
                    }

                    if (col < 20 && this.board[this.getPosition(col + 1, row)] !== 0) {
                        var right_marker = this.board[this.getPosition(col + 1, row)];
                        console.log("Checking right for: " + right_marker);

                        for (i = col + 1; i !== this.size - 1; i++) { //going left first
                            if (this.board[this.getPosition(i, row)] === right_marker) {
                                if (right_marker === player_marker) {
                                    this_score += 2;
                                } else {
                                    this_score += 1;
                                }
                            } else {
                                break;
                            }
                        }
                    }

                    if (row > 0 && this.board[this.getPosition(col, row - 1)] !== 0) {
                        var top_marker = this.board[this.getPosition(col, row -1)];
                        for (i = row - 1; i !== 0; i--) { //going left first
                            if (this.board[this.getPosition(col, i)] === top_marker) {
                                if (top_marker === player_marker) {
                                    this_score += 2;
                                } else {
                                    this_score += 1;
                                }
                            } else {
                                break;
                            }
                        }
                    }

                    if (row < this.size && this.board[this.getPosition(col, row + 1)] !== 0) {
                        var btm_marker = this.board[this.getPosition(col, row + 1)];
                        for (i = row + 1; i !== this.size - 1; i++) { //going left first
                            if (this.board[this.getPosition(col, i)] === btm_marker) {
                                if (btm_marker === player_marker) {
                                    this_score += 2;
                                } else {
                                    this_score += 1;
                                }
                            } else {
                                break;
                            }
                        }
                    }
                }
                console.log(`Score for ${col}, ${row}:     ${this_score}`);
                if (this_score > best_score) {
                    console.log("Found a better position " + this_position);
                    best_move = this_position;
                }
            }
        }
        console.log(best_move);
        return best_move;
    }

    /**
     * Place a marker at the internal board position.
     *
     * @param  Integer position to place marker.
     *
     * @return this
     */
    placeMarker(position) {
        this.board[position] = this.player;
        return this;
    }



    /**
     * Gets a more readable name of the the current player.
     *
     * @return String
     */
    playerInTurn() {
        var player = "No player";

        if (this.player === 1) {
            player = this.player1;
        } else if (this.player === 2) {
            player = this.player2;
        }

        return player;
    }



    /**
     * What is the next players marker?
     *
     * @return String
     */
    playerInTurnMarker() {
        return this.marker[this.player];
    }



    /**
     * Swap to next player in turn.
     *
     * @return void
     *
     */
    nextPlayer() {
        this.player = (this.player === 1) ? 2 : 1;
    }



    /**
     * Returns the current game board as a printable string.
     *
     * @return String
     */
    asAscii() {
        var x, y, value,
            ascii = "";

        ascii += "  ";
        for (x = 0; x < this.size; x++) {
            ascii += " " + x % 10;
        }
        ascii += " \n";

        for (y = 0; y < this.size; y++) {
            if (y < 10) {
                ascii += " ";
            }
            ascii += y;

            for (x = 0; x < this.size; x++) {
                value = this.board[x + y * this.size];
                ascii += "|" + this.marker[value];
            }
            ascii += "|\n";
        }

        return ascii;
    }
}
export default GomokuBoard;
/* jshint ignore:end */
