/**
 * Class for Gomoku board.
 *
 */
class GomokuBoard {



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

        this.placeMarker(position)
        //this.isWin(x, y);
        this.nextPlayer();

    }
    //check if the move wins
    isWon(x, y){
        var win_flag = false;
        var x_diff = (x >= 5) ? 5 : x;
        var y_diff = (y >= 5) ? 5 : y;
        var marker = (this.player === 1) ? 2 : 1;
        console.log(`Placed ${x}, ${y} with ${marker}`);
        console.log("Testing horizontally!");
        for(var i = x - x_diff; i !== x + 1; i++) {
            var count = 0;
            console.log("Looping");
            for(var j = i; j !== i + 5; j++) {
                if (this.board[this.getPosition(j, y)] === marker) {
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
        console.log("Testing vertically!");
        for(var i = y - y_diff; i !== y + 1; i++) {
            var count = 0;
            console.log("Looping");
            for(var j = i; j !== i + 5; j++) {
                if (this.board[this.getPosition(x, j)] === marker) {
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
        for(var i = x - x_diff; i !== x + 1; i++) {
            var count = 0
            console.log(`Testing x ${i}`);
            for(var j = i; j !== i + 5; j++) {
                var diff = (y - x_diff) + iteration;
                    console.log(`Running ${j}, ${diff}. Looking for ${marker}`)
                    if (this.board[this.getPosition(j, diff)] === marker) {
                        count++;
                        if (count === 5) {
                            return `Player ${marker} has won!`;
                        }
                    } else {
                        count = 0;
                        break;
                    }
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

    getPositionMarker(position) {
        return this.board[getPosition];
    }

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
        var OK_flag = false;
        while (!OK_flag) {
            var x = Number.parseInt(Math.floor(Math.random() * this.size));
            var y = Number.parseInt(Math.floor(Math.random() * this.size));

            if(!this.isPositionTaken(x, y)) {
                this.place(x, y);
                OK_flag = true;
            }
    }
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
