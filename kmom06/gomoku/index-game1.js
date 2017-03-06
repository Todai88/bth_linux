/**
 * Main program for the a game of Gomoku.
 */
"use strict";

import GomokuBoard from "./GomokuBoard.js";

/*

Imports

*/

var path = require('path');
var scriptName = path.basename(process.argv[1]);
var args = process.argv.slice(2);
var readline = require("readline");

/*

Globals

*/

var size,
    prompt = "Gomoku$ ",
    gameBoard;
var VERSION = '1.0.0.a';

/*

Parse any available options.

*/


function usage() {

    console.log(`
Usage: ${scriptName} [options] <min> <max>


Available Options:

    -h                  Displays help text.
    -v                  Display the script version.
`);

}

function version() {

    console.log(`Script: ${scriptName}.
Version: ${VERSION}`);
}

var remaining = [];
args.forEach((arg) => {
    switch (arg) {
        case '-h':
            usage();
            process.exit(0);
            break;

        case '-v':
            version();
            process.exit(0);
            break;

        default:
            remaining.push(arg);
            break;
    }
});

if (remaining.length == 1) {
    size = remaining[0];
} else {
    console.log(`
!----    ERROR    ----!
Incorrect usage; too many arguments.
!----    ERROR    ----!
`);
    usage();
    process.exit(0);
}



/*

Initiate gameboard.

*/

gameBoard = new GomokuBoard();

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



/**
 * Returns a random integer between min (included) and max (included)
 * Using Math.round() will give you a non-uniform distribution!
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



/**
 * Place a marker on the board.
 */
function placeRandomMarker() {
    var x, y,
        player = gameBoard.playerInTurn();

    while (!gameBoard.isFull()) {
        x = getRandomIntInclusive(0, size);
        y = getRandomIntInclusive(0, size);

        if (!gameBoard.isPositionTaken(x, y)) {
            break;
        }
    }

    gameBoard.place(x, y);
    console.log(">>> " + player + " places " + x + " " + y + "\n");
    console.log(gameBoard.asAscii());
}

function placeMarker(x_val, y_val) {
    var player = gameBoard.playerInTurn();

    gameBoard.place(x_val, y_val);
    console.log(">>> " + player + " places " + x_val + " " + y_val + "\n");
    console.log(gameBoard.asAscii());
}

function testPosition(x_val, y_val) {

    if (!gameBoard.isPositionTaken(x_val, y_val)) {
        return true;
    } else {return false;}

}

function is_numerical(input) {

    if (!isNaN(input[0]) && !isNaN(input[1])) {
        return true;
    } else {
        return false;
    }
}

rl.on("line", function(line) {
    switch (line.trim()) {
        case "exit":
            console.log("Bye!");
            process.exit(0);
            break;
        default: // all other cases are treated as a place-action.

            /*
            Trim the read line from white-spaces
            and then filter on numbers, meaning anything that isn't
            a number will be discarded (like whitespaces between the two numbers).
            */
            var markers_array = line.trim().split(" ");
            markers_array = markers_array.filter(function(val) {
                if (parseInt(val) >= 0) {
                    return val;
                }
            });

            /*

            First check there are only two items in the array, if not we are
            treating it as a randomizing action.

            */

            if (markers_array.length !== 2) {
                /*

                Print string to explain we are randomizing, then random.

                */
                console.log(`
Incorrect amount of arguments, we require two (2), separated by a space " ".
You wrote ${line}.
Example: '10 10' places a marker on x:10, y:10.
Randomizing...
`);
                placeRandomMarker();


            } else {

                /*
                Check if both the elements in the array are indeed numbers.
                */

                if (is_numerical(markers_array)) {
                    console.log(markers_array[0] + " , " + markers_array[1]);
                    console.log(size);
                    var numone = parseInt(markers_array[0]);
                    var numtwo = parseInt(markers_array[1]);
                    if (numone <= size  && numone >= 0 && numtwo >= 0 && numtwo <= size) {
                        if (testPosition(numone, numtwo)) {
                            placeMarker(numone, numtwo);
                        } else {
                            console.log(`Position ${numone}, ${numtwo} is already taken.. Try again!`);
                        }
                    } else {
                        console.log(`
                            The numbers you provided were out of bounds: ${line}. ${markers_array}
                            Range is between 0-${size}
                            `);
                    }

                } else {
                    /*

                    Print string to explain that we require *ONLY*
                    numerical values on the line.

                    */
                    console.log(
`Incorrect input. ${line}
You should enter two NUMBERS with a space inbetween.
Correct   usage: 10 10
Incorrect usage: 10, 10`);
                }
            }
    }
    rl.prompt();
});



rl.on("close", function() {
    rl.write("Bye!");
    process.exit(0);
});



// Here starts the actual main program
console.log(">>> Start the game with board size of " + size);
gameBoard.start(size);

rl.setPrompt(prompt);
rl.prompt();
