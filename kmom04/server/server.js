/**
 * Simple HTTP server returning Hello World as plain text.
 */
"use strict";

// Require the module
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const child = require("child_process");
const qs = require("querystring");
var uti = require("./utility_routes.js");

// Use the createServer function to create the simple server
var server = http.createServer((req, res) => {

    var ipAddress,
        route;

    // Log incoming requests
    ipAddress = req.connection.remoteAddress;
    route = url.parse(req.url).pathname;
    console.log("Incoming request from ip " + ipAddress);
    uti.find_route(route, res);


    // // Switch (route) on the path.
    // switch (route) {
    //     case "/":
    //         console.log("In /");
    //         res.writeHead(200, { "Content-Type": "text/plain" });
    //         res.end("Hello World!\n");
    //     break;
    //
    //     case "/index.html":
    //         console.log("In /index.html");
    //         // About page route.
    //         var filename = path.join(__dirname, 'index.html');
    //         fs.readFile(filename, "utf8", (err, data) => {
    //                 if (err) {
    //                     res.writeHead(500, { "Content-Type": "text/plain"});
    //                     res.end("Internal server error");
    //                     console.log("Internal server error");
    //                     throw err;
    //
    //                 }
    //
    //                 res.writeHead(200, { "Content-Type": "text/html" });
    //                 res.end(data);
    //
    //             });
    //     break;
    //
    //     case "/status":
    //
    //         child.exec("uname -a", (error, stdout, stderr) => {
    //
    //                 if (error || stderr) {
    //                     // Do something with the error(s)
    //                     console.log("Something went wrong...", error, stderr);
    //                 }
    //
    //                 // Write the result of standard output as plain text.
    //                 out = {
    //                     "uname" : stdout.replace(/(\r\n|\n|\r)/gm, "")
    //                 };
    //                 var jsonObj = JSON.stringify(out);
    //                 res.writeHead(200, { "Content-Type": "application/json" });
    //                 res.end("\n" + jsonObj + "\n" + "\n");
    //
    //             });
    //
    //     break;
    //
    //     case "/sum":
    //         urlParts = url.parse(req.url, true);
    //         query = urlParts.query;
    //         queryString = qs.stringify(query);
    //         var sum = 0;
    //         Object.keys(query).forEach( key => {
    //             sum += parseInt(`${key}`);
    //         });
    //         out = {
    //             "sum" : sum
    //         };
    //         var jsonObj = JSON.stringify(out);
    //         res.writeHead(200, { "Content-Type": "application/json" });
    //         res.end("\n" + jsonObj + "\n" + "\n");
    //     break;
    //
    //     case "/filter":
    //         urlParts = url.parse(req.url, true);
    //         query = urlParts.query;
    //         queryString = qs.stringify(query);
    //         var arr = [];
    //         Object.keys(query).forEach( key => {
    //             if (parseInt(`${key}`) <= 42) {
    //                 arr.push(parseInt(`${key}`));
    //             }
    //         });
    //         out = {
    //             "filter" : arr
    //         };
    //         jsonObj = JSON.stringify(out);
    //         res.writeHead(200, { "Content-Type": "application/json" });
    //         res.end("\n" + jsonObj + "\n" + "\n");
    //     break;
    //
    //     default:
    //         // Not found route.
    //         res.writeHead(404, { "Content-Type": "text/plain" });
    //         res.end("The resource does not exist.\n");
    //     break;
    // }

});

// Export the server as a module.
//export default server;
module.exports = server;
