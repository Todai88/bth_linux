/**
 * Simple HTTP server returning Hello World as plain text.
 */
"use strict";

// Require the module
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

// Use the createServer function to create the simple server
var server = http.createServer((req, res) => {

    var ipAddress,
        route;

    // Log incoming requests
    ipAddress = req.connection.remoteAddress;
    route = url.parse(req.url).pathname;
    console.log("Incoming request from ip " + ipAddress);

    // Switch (route) on the path.
   switch (route) {
       case "/":
           console.log("In /");
           res.writeHead(200, { "Content-Type": "text/plain" });
           res.end("Hello World!\n");
       break;

       case "/index.html":
            console.log("In /index.html");
           // About page route.
           var filename = path.join(__dirname, 'index.html'), data;
           fs.readFile(filename, "utf8", (err, data) => {
               if (err) {
                   res.writeHead(500, { "Content-Type": "text/plain"});
                   res.end("Internal server error");
                   console.log("Internal server error");
                   throw err;

               }

               res.writeHead(200, { "Content-Type": "text/html" });
               res.end(data);

                });
       break;

       default:
           // Not found route.
           res.writeHead(404, { "Content-Type": "text/plain" });
           res.end("404. No route matching.\n");
       break;
   }

});

// Export the server as a module.
//export default server;
module.exports = server;
