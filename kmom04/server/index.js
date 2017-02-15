/**
 * Main program to run a simple server that says Hello World.
 *
 */
"use strict";

const path = require("path");
const fs = require("fs");
const server = require("./server.js");
const process = require("process");

// Check if LINUX_PORT env is defined, else use predefined port 1337.
if(process.env.LINUX_PORT !== undefined){
    console.log("Found port environment variable: " + process.env.LINUX_PORT);
    server.listen(process.env.LINUX_PORT);
} else {
    console.log("Couldn't find LINUX_PORT environment variable. Falling back to 1337." +
                "Not like it makes any difference..");
    server.listen(1337);
}

// Write pid to file
var pidFile = path.join(__dirname, "pid");
fs.writeFile(pidFile, process.pid, function(err) {
    if (err) {
        return console.log(err);
    }

    console.log("Wrote process id to file 'pid'");
});

console.log("Simple server listen on port 1337 with process id " + process.pid);
