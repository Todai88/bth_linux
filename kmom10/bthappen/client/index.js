#!/usr/bin/env babel-node

/**
 * Main program to run the bthappen client
 *
 */
"use strict";

const VERSION = "1.0.0";

// For CLI usage
var path = require("path");
var scriptName = path.basename(process.argv[1]);
var args = process.argv.slice(2);
var arg;



// Get the server with defaults
import BthappenClient from "./BthappenClient.js";

var client = new BthappenClient();
var server = "http://localhost:1337";



// Make it using prompt
var readline = require("readline");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



/**
 * Display helptext about usage of this script.
 */
function usage() {
    console.log(`Usage: ${scriptName} [options]

Options:
 -h                 Display help text.
 -v                 Display the version.
 --server <url>     Set the server url to use. http:// is concatenated to the beginning of the server, so you don't need to add it!
 --port   <number>  Sets the port used to connect to the server.`);
}

/*
    Setting up default variables to point to localhost.
*/

var port = 1337;
var server = "localhost";

if (process.env.LINUX_PORT) {
    port = process.env.LINUX_PORT; // if env variable is set we are using it.
}

if (process.env.LINUX_SERVER) {
    server = "http://" + process.env.LINUX_SERVER + ":" + port; // if env variable is set we are using it.
}

/**
 * Display helptext about bad usage.
 *
 * @param String message to display.
 */
function badUsage(message) {
    console.log(`${message}
Use -h to get an overview of the command.`);
}



/**
 * Display version.
 */
function version() {
    console.log(VERSION);
}



// Walkthrough all arguments checking for options.
while ((arg = args.shift()) !== undefined) {
    switch (arg) {
        case "-h":
            usage();
            process.exit(0);
            break;

        case "-v":
            version();
            process.exit(0);
            break;

        case "--server":
            server = args.shift();
            if (server === undefined) {
                badUsage("--server must be followed by a url.");
                process.exit(1);
            }
            break;
        case "--port":
            port = Number.parseInt(args.shift());
            if (Number.isNaN(port)) {
                badUsage("--port must be followed by a port number.");
                process.exit(1);
            }
            break;

        default:
            badUsage("Unknown argument.");
            process.exit(1);
            break;
    }
}



/**
 * Display a menu.
 */
function menu() {
    console.log(`
Commands available:

 exit            Leave this program.
 menu            Print this menu.
 url             Get url to view this server in browser.
 view <id>       View the room with the selected id.
 house <house>   View the names of all rooms in this building (house).
 search <string> View the details of all matching rooms (one per row).
 `);
}

function printAll(object) {
    console.log(`
Room ID   : ${(object.Salsnr) ? object.Salsnr : "/* Not defined in the list. */"}
Room Name : ${(object.Salsnamn) ? object.Salsnam : "/* Not defined in the list. */"}
Lat       : ${(object.lat) ? object.lat : "/* Not defined in the list. */"}
Long      : ${(object.long) ? object.long : "/* Not defined in the list. */"}
Place     : ${(object.Ort) ? object.Ort : "/* Not defined in the list. */"}
House     : ${(object.Hus) ? object.Hus : "/* Not defined in the list. */"}
Floor     : ${(object.Våning) ? object.Våning : "/* Not defined in the list. */"}
Type:     : ${(object.Typ) ? object.Typ : "/* Not defined in the list. */"}
Size      : ${(object.Storlek) ? object.Storlek : "/* Not defined in the list. */"}
`)
}

/**
 * Callbacks for game asking question.
 */
rl.on("line", function(line) {
    // Split incoming line with arguments into an array
    var args = line.trim().split(" ");
    args = args.filter(value => {
        return value !== "";
    });

    switch (args[0]) {
        case "exit":
            console.log("Bye!");
            process.exit(0);
            break;

        case "menu":
            menu();
            rl.prompt();
            break;
        case "list" :
            client.listAll()
            .then(value => {
                console.log(value);
                rl.prompt();
            })
            .catch(err => {
                console.log("FAILED: Could not fetch the list.. \nDetails: " + err);
                rl.prompt();
            });
            break;

        case "view" :
            var id = args[1];
            client.getBasedOnNumber(id)
            .then(value => {
                //var temp = JSON.stringify(value).replace(/null/i, "\"\"");
                //console.log(temp);
                var parsed = JSON.parse(value);
                printAll(parsed.sal[0]);
                rl.prompt();
            })
            .catch(err => {
                console.log("FAILED: Could not fetch the list.. \nDetails: " + err);
                rl.prompt();
            });
            break;
        // case "start":
        //     var size = args[1] || 20;
        //
        //     gomoku.start(size)
        //     .then(value => {
        //         console.log(value);
        //         rl.prompt();
        //     })
        //     .catch(err => {
        //         console.log("FAILED: Could not start the game.\nDetails: " + err);
        //         rl.prompt();
        //     });
        //     break;
        //
        // case "view":
        //     gomoku.view()
        //     .then(value => {
        //         console.log(value);
        //         rl.prompt();
        //     })
        //     .catch(err => {
        //         console.log("FAILED: Could not view the game.\nDetails: " + err);
        //         rl.prompt();
        //     });
        //     break;
        //
        // case "place":
        //
        //     if (args[1] === 'random') {
        //         gomoku.random()
        //         .then(value => {
        //             console.log(value);
        //
        //             //var val = JSON.parse(value);
        //             // if (val.boardIsWon.includes("won")) {
        //             //     console.log(`${val.boardIsWon}. Closing game-loop!`);
        //             //     process.exit(0);
        //             // }
        //
        //             rl.prompt();
        //         })
        //         .catch(err => {
        //             console.log("FAILED: Could not place the marker.\nDetails: " + err);
        //             rl.prompt();
        //         });
        //
        //     }
        //     else {
        //         var x = args[1];
        //         var y = args[2];
        //
        //         gomoku.place(x, y)
        //         .then(value => {
        //             console.log(value);
        //             var val = JSON.parse(value);
        //             if (val.boardIsWon.includes("won")) {
        //                 console.log(`${val.boardIsWon}. Closing game-loop!`);
        //                 process.exit(0);
        //             }
        //             rl.prompt();
        //         })
        //         .catch(err => {
        //             console.log("FAILED: Could not place the marker.\nDetails: " + err);
        //             rl.prompt();
        //         });
        //
        //     }
        //     break;

        case "url":
            console.log(`Use this URL to view the server in your browser: ${server}:${port}`);
            rl.prompt();
            break;

        default:
            console.log("Enter 'menu' to get an overview of what you can do here.");
            rl.prompt();
    }
});



rl.on("close", function() {
    console.log("Bye!");
    process.exit(0);
});



// Main
client.setServer(server, port);
console.log("Use -h to get a list of options to start this program.");
console.log("Ready to talk to server url '" + server + "'.");
console.log("Use 'menu' to get a list of commands.");
rl.setPrompt("Salar$ ");
rl.prompt();
