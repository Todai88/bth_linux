/**
 * Main program to run a simple server that says Hello World.
 *
 */
"use strict";
// jscs:disable
//const path = require("path");
// const fs = require("fs");
// const server = require("./server.js");
// const utility = require("./utility_pid.js");
const process = require("process");

console.log("Simple server listen on port 1337 with process id " + process.pid);
