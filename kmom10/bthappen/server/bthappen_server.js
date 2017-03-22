/**
 * Front for GomokuServer
 */
"use strict";

// The main class for the Gomoku game
import server_logic from "./server_logic.js";
var server_body = new server_logic();


// A better router to create a handler for all routes
//import Router from "./router";
import Router from "./router";
var router = new Router();



// Import the http server as base
var http = require("http");
var url = require("url");



/**
 * Wrapper function for sending a JSON response
 *
 * @param  Object        res     The response
 * @param  Object/String content What should be written to the response
 * @param  Integer       code    HTTP status code
 */
function sendJSONResponse(res, content, code = 200) {
    res.writeHead(code, "Content-Type: application/json");
    res.write(JSON.stringify(content, null, "    "));
    res.end();
}



/**
 * Display a helptext about the API.
 *
 * @param Object req The request
 * @param Object res The response
 */
router.get("/", (req, res) => {

    res.writeHead(200, "Content-Type: text/plain");
    res.write("Welcome the GomokuBoard server. This is the API of what can be done.\n\n" +
        " /                         Display this helptext.\n" +
        " /room/list                Show all halls." +
        " /room/view/id/:number     Show details of lecture hall with supplied :number.\n" +
        " /room/view/house/:house   Show all lecture halls in the supplied :house.\n" +
        " /room/search/:search      Search for supplied :search in all fields.\n"
    );
    res.end();
});



/**
 * Initialize the game
 *
 * @param Object req The request
 * @param Object res The response
 */
router.get("/room/list", (req, res) => {

    var message = "Attempting to get a list of all rooms.";
    try {
        server_body.getList();
    } catch (e) {
        message = e.message;
    }

    // Send the response
    sendJSONResponse(res, {
        "message": message,
        "rooms" : server_body.getList(),
        "boardSize": server_body.getSize()
    });
});

router.get("/room/view/id/:number", (req, res) => {

    var room = req.params.number;
    var message = "Attempting to get a list of all rooms.";
    try {
        server_body.getRoom(room);
    } catch (e) {
        message = e.message;
    }

    // Send the response
    sendJSONResponse(res, {
        "message": message,
        "sal"    : server_body.getRoom(room)
    });
});

router.get("/room/view/house/:house", (req, res) => {

    var house = req.params.number;
    var message = "Attempting to get a list of all rooms.";
    try {
        server_body.getRoomsOfHouse(house);
    } catch (e) {
        message = e.message;
    }

    // Send the response
    sendJSONResponse(res, {
        "message": message,
        "sal"    : server_body.getRoomsOfHouse(house)
    });
});

router.get("/room/search/:search", (req, res) => {
    var queryData = url.parse(req.url, true).query;
    console.log(queryData);
    var query = req.params.search;
    var message = "Searching all room details for substring hits on your query.";
    try {
        server_body.getFromSearch(query);
    } catch (e) {
        message = e.message;
    }

    // Send the response
    sendJSONResponse(res, {
        "message": message,
        "query"  : query,
        "sal"    : server_body.getFromSearch(query)
    });
});

router.get("/room/searchp/:search", (req, res) => {

    var query = req.params.search;
    var message = "Searching all room details for substring hits on your query.";
    try {
        server_body.getFromSearch_prio(query);
    } catch (e) {
        message = e.message;
    }

    // Send the response
    sendJSONResponse(res, {
        "message": message,
        "query"  : query,
        "sal"    : server_body.getFromSearch_prio(query)
    });
});


/**
 * Create and export the server
 */
var server = http.createServer((req, res) => {
    var ipAddress,
        route;

    // Log incoming requests
    ipAddress = req.connection.remoteAddress;

    // Check what route is requested
    route = url.parse(req.url).pathname;
    console.log("Incoming route " + route + " from ip " + ipAddress);

    // Let the router take care of all requests
    router.route(req, res);
});

export default server;
