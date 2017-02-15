/**
 * Main program to run a simple server that says Hello World.
 *
 */
"use strict";

const path = require("path");
const fs = require("fs");
const server = require("./server.js");
const process = require("process");

console.log("Found port environment variable: " + process.env.LINUX_PORT);
// Start the server to listen on a port
server.listen(process.env.LINUX_PORT);

// Write pid to file
var pidFile = path.join(__dirname, "pid");
fs.writeFile(pidFile, process.pid, function(err) {
    if (err) {
        return console.log(err);
    }

    console.log("Wrote process id to file 'pid'");
});

console.log("Simple server listen on port 1337 with process id " + process.pid);
