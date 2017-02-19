"use strict";

var child = require('child_process');
var http = require('http');

var server = http.createServer((req, res) => {

	var ipAddress;

	ipAddress = req.connection.remoteAddress;

	console.log("Incoming request from ip: " + ipAddress);

	//creating an 'uptime' child process!
	child.exec('uptime', (error, stdout, stderr) => {

		if (error || stderr) {

			console.log("Something went wrong...", error, stderr);
			}

		res.writeHead(200, { 'Content-Type' : 'text/plain' });
		res.end(stdout);
	});

}).listen(1337);
export default server;
