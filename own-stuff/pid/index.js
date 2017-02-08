"use strict";

import server from "./server.js";

const path = require("path");
const fs   = require("fs");

server.listen(1337);

var pidFile = path.join(__dirname, "pid");

fs.writeFile(pidFile, process.pid, function(err){

	if(err) {

		return console.log(err);
	}

	console.log("Wrote process id to file 'pid'");
});

console.log("Simple server listen on port 1337 with process id " + process.pid);

function controlledShutdown(signal){

	console.warn(`Caught ${signal}. Removing pid-file and will then exit.`);
	fs.unlinkSync(pidFile);
	process.exit();
}

if (process.platform === "win32") {
	var rl = require("readline").createInterface({

		input: process.stdin,
		output: process.stdout
	});
	
	rl.on("SIGINT", function () {
		process.emit("SIGINT");
	});
}


process.on("SIGTERM", () => { controlledShutdown("SIGTERM"); });
process.on("SIGINT",  () => { controlledShutdown("SIGINT"); });
