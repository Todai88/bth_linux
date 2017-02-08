"use strict";

var http = require("http");

var server = http.createServer((req, res) => {

	var ipAddress;

	ipAddress = req.connection.remoteAddress;
	console.log("Incoming request from ip: " + ipAddress);

	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("Worked fine!");
});

export default server;
