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
 -h                 Display this text.
 -v                 Display the version.
 --server <url>     Set the server url to use. http:// is concatenated to the beginning of the server, so you SHOULD NOT add it!
 --port   <number>  Sets the port used to connect to the server.

 Once connected use 'menu' to get further instructions on how to run the actual program!
`);
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

        case "--develop":
            console.log(`
/***********************************************/

          Development Environment: ON

/***********************************************/
`);
            client.setVerbose(true);
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

 exit                   Leave this program.
 menu                   Print this menu.
 url                    Get url to view this server in browser.
 view       <id>        View the room with the selected id.
 house      <house>     View the names of all rooms in this building (house).
 search     <string>    View the details of all matching rooms (one per row).
 searchp    <string>    View the details of all matching rooms, prioritized.
 `);
}

function printAll(object) {
    console.log(`
Room ID   : ${(object.Salsnr) ? object.Salsnr : "/* Not defined in the list. */"}
Room Name : ${(object.Salsnamn) ? object.Salsnamn : "/* Not defined in the list. */"}
Lat       : ${(object.lat) ? object.lat : "/* Not defined in the list. */"}
Long      : ${(object.long) ? object.long : "/* Not defined in the list. */"}
Place     : ${(object.Ort) ? object.Ort : "/* Not defined in the list. */"}
House     : ${(object.Hus) ? object.Hus : "/* Not defined in the list. */"}
Floor     : ${(object.Våning) ? object.Våning : "/* Not defined in the list. */"}
Type:     : ${(object.Typ) ? object.Typ : "/* Not defined in the list. */"}
Size      : ${(object.Storlek) ? object.Storlek : "/* Not defined in the list. */"}
`)
}

function printRoomName(object) {
    var out = (object.Salsnamn === "" || object.Salsnamn === undefined || object.Salsnamn === null) ? "Name not defined (null / undefined)" : object.Salsnamn;
    console.log(out);
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
    var max = null;
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
            if (args[1] !== null && args[1] !== undefined){
                if (args[1] === "max"){
                    if (args[2] !== null && args[2] !== undefined && !isNaN(Number(args[2]))){
                        max = args[2];
                    } else {
                        console.log("Max must be followed by a number! Try again.");
                        rl.prompt();
                        break;
                    }
                }
            }
            client.listAll(max)
            .then(value => {
                var parsed_array = JSON.parse(value);
                //console.log(parsed_array.sal);
                for (var item of parsed_array.result){
                    printAll(item);
                }
                rl.prompt();
            })
            .catch(err => {
                console.log("FAILED: Could not fetch the list.. \nDetails: " + err);
                rl.prompt();
            });
            break;

        case "view" :
            var id = args[1];
            if (args[2] !== null && args[2] !== undefined){
                if (args[2] === "max"){
                    if (args[3] !== null && args[3] !== undefined && !isNaN(Number(args[3]))){
                        max = args[3];
                    } else {
                        console.log("Max must be followed by a number! Try again.");
                        rl.prompt();
                        break;
                    }
                }
            }
            if (id !== undefined){
            client.getBasedOnNumber(id, max)
            .then(value => {
                //var temp = JSON.stringify(value).replace(/null/i, "\"\"");
                var parsed = JSON.parse(value);
                if (parsed.result.length > 0){
                    printAll(parsed.result[0]);
                } else {
                    console.log(`
Allthough you have supplied a correct value (ie. Response-Code 200), the resulting dataset does not contain any items.
Please try a different filter or change your filtering criteria!
`);
                }

                rl.prompt();
            })
            .catch(err => {
                console.log("FAILED: Could not fetch the list.. \nDetails: " + err);
                rl.prompt();
            });
        } else {
            console.log("You didn't suply an argument. Please try again!");
            rl.prompt();
    }

            break;
        case "house" :
            var house = args[1];
            if (args[2] !== null && args[2] !== undefined){
                if (args[2] === "max"){
                    if (args[3] !== null && args[3] !== undefined && !isNaN(Number(args[3]))){
                        max = args[3];
                    } else {
                        console.log("Max must be followed by a number! Try again.");
                        rl.prompt();
                        break;
                    }
                }
            }
            if (house !== undefined) {
                client.getBasedOnHouse(house, max)
                .then(value => {
                    var parsed_array = JSON.parse(value);
                    if (parsed_array.result.length > 0) {
                        for (var item of parsed_array.result){
                            printRoomName(item);
                        }
                    } else {
                        console.log(`
Allthough you have supplied a correct value (ie. Response-Code 200), the resulting dataset does not contain any items.
Please try a different filter or change your filtering criteria!
`);
                }
                rl.prompt();
            })
            .catch(err => {
                console.log("FAILED: Could not fetch the list.. \nDetails: " + err);
                rl.prompt();
            });
        } else {
            console.log("You didn't suply an argument. Please try again!");
            rl.prompt();
        }
            break;

        case "search" :
            var query_string = args[1];
            if (args[2] !== null && args[2] !== undefined){
                if (args[2] === "max"){
                    if (args[3] !== null && args[3] !== undefined && !isNaN(Number(args[3]))){
                        max = args[3];
                    } else {
                        console.log("Max must be followed by a number! Try again.");
                        rl.prompt();
                        break;
                    }
                }
            }
            if (query_string !== undefined) {
                client.getBasedOnQuery(query_string, max)
                .then(value => {
                    var search_result = JSON.parse(value);
                    if (search_result.result.length > 0) {
                        for (var item of search_result.result) {
                            printAll(item);
                        }
                    } else {
                        console.log(`
Allthough you have supplied a correct value (ie. Response-Code 200), the resulting dataset does not contain any items.
Please try a different filter or change your filtering criteria!
`);
                    }
                    rl.prompt();
                })
                .catch(err => {
                    console.log("FAILED: Could not fetch the list.. \nDetails: " + err);
                    rl.prompt();
                });
            } else {
                console.log("You didn't suply an argument. Please try again!");
                rl.prompt();
            }
            break;

        case "searchp" :
            var query_string = args[1];
            if (args[2] !== null && args[2] !== undefined){
                if (args[2] === "max"){
                    if (args[3] !== null && args[3] !== undefined && !isNaN(Number(args[3]))){
                        max = args[3];
                    } else {
                        console.log("Max must be followed by a number! Try again.");
                        rl.prompt();
                        break;
                    }
                }
            }
            if (query_string !== undefined) {
                client.getBasedOnAlgorithm(query_string, max)
                .then(value => {
                    var search_result = JSON.parse(value);
                    if (search_result.result.length > 0) {
                        for (var item of search_result.result) {
                            printAll(item[0]);
                            console.log(`Highest priority based on key '${item[1][0]}' with priority ${item[1][1] / 100}.`)
                        }
                    } else {
                        console.log(`
Allthough you have supplied a correct value (ie. Response-Code 200), the resulting dataset does not contain any items.
Please try a different filter or change your filtering criteria!
`);
                }
                rl.prompt();
            })
            .catch(err => {
                console.log("FAILED: Could not fetch the list.. \nDetails: " + err);
                rl.prompt();
            });
        } else {
            console.log("You didn't suply an argument. Please try again!");
            rl.prompt();
        }
            break;

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
