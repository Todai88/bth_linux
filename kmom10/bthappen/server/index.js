#!/usr/bin/env babel-node
<<<<<<< HEAD
// jscs:disable
=======

>>>>>>> 4ea76b5d41b436f0964e8f18bd02120fc8d84a61
/**
 * Main program to run the Gomoku server
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
import server from "./bthappen_server.js";
var m = require("./bthappen_server.js");
//var srv = new server();

var port = 1337; // default port.

if (process.env.LINUX_PORT) {
    port = process.env.LINUX_PORT; // if env variable is set we are using it.
}

/**
 * Display helptext about usage of this script.
 */
function usage() {
    console.log(`Usage: ${scriptName} [options]

Options:
 -h               Display help text.
 -v               Display the version.
 --port <number>  Run server on this port.`);
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
    console.log("Version number: " + VERSION);
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
            m.setVerbose();
            //VERBOSE = true;
            break;

        default:
            //remainingArgs.push(arg);
            badUsage("Unknown argument.");
            process.exit(1);
            break;
    }
}



// Main
server.listen(port);
console.log("The server is now listening on: " + port);
