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

function version(){

    console.log(`Script: ${scriptName}.
Version: ${VERSION}`)
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

if(remaining.length == 1){
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
function placeMarker() {
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
rl.on("line", function(line) {
    switch (line.trim()) {
        case "exit":
            console.log("Bye!");
            process.exit(0);
            break;
        default:
        if(line.length == 0){
            console.log("Too low, randomizing!");
            placeMarker();
        } else {
            console.log("Seems OK: " + line);
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
