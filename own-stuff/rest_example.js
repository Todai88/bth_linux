// Get module for http

var http = require('http');

// Use the variable to create a server
// The server executes the function for each request it recieves.

http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello World from REST!\n');
	}).listen(1337);

console.log('Server running at http://178.62.110.17');
