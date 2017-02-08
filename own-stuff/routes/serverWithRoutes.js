"use strict";

var http = require('http');
var url = require('url');

var server = http.createServer((req, res) => {

	var ipAddress,
	    route;

	ipAddress = req.connection.remoteAddress;

	route = url.parse(req.url).pathname;

	console.log("Incoming route " + route + " from ip " + ipAddress);

	switch (route) {

		case '/':
		
		// Home page

		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('Home page\n');
		break;
	
		case '/about':

		// About page

		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end("About\n");
		break;
	
		default:

		// No route found

		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('404. No matching route.\n');
		break;
	}

});

export default server;
