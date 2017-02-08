/*

	Simple HTTP server returning JSON to the client
*/

"use strict";

var http = require('http');

var data = {

	'text': 'Hello World!',
	'advice': 'Check pentestimonials.wordpress.com!'
};

var server = http.createServer((req, res) => {

	var ipAddress;

	ipAddress = req.connection.remoteAddress;
	console.log('Incoming request from ip: ' + ipAddress);

	res.writeHead(200, { 'Content-Type': 'application/json' });

	var jsonObj = JSON.stringify(data);

	res.end(jsonObj + '\n');
}).listen(1337);

export default server;
