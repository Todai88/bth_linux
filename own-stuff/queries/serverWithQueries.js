"use strict";

var http = require("http");
var url = require("url");
var qs = require("querystring");
var util = require("util");

var server = http.createServer((req, res) => {

		var ipAddress,
		    urlParts,
		    route,
		    query,
	  	    queryString;

	
		ipAddress = req.connection.remoteAddress;

		urlParts = url.parse(req.url, true);
		route = urlParts.pathname;
		query =urlParts.query;
		queryString = qs.stringify(query);

		console.log("Incoming route " + route + " from ip " + ipAddress + " with querystring " + queryString);

		console.log(util.inspect(query));

		Object.keys(query).forEach( key => {

			console.log(`"${key}" : "${query[key]}"`);
		});

		switch (route) {
		
			case '/':

				res.writeHead(200, { "Content-Type": "text/plain" });
				res.end("Home page\n");
			break;

			default:

				res.writeHead(404, { "Content-Type": "text/plain" });
				res.end("404, no matching route\n");
			break;

		}
	});

export default server;
