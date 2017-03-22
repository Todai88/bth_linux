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
var VERBOSE = false;


/**
 * Wrapper function for sending a JSON response
 *
 * @param  Object        res     The response
 * @param  Object/String content What should be written to the response
 * @param  Integer       code    HTTP status code
 */
function sendJSONResponse(res, content, code = 200) {
    res.writeHead(code, "Content-Type: application/json; charset=utf8");
    res.write(JSON.stringify(content, null, "    "));
    if(VERBOSE){
        if (content.result.length !== 0) {
            if (content.result[0].length === 2) {
                var out = (`{
'message': ${content.message},
'query':   ${content.query},
'result':
`);
                for (var item of content.result) {
                    var tmp = JSON.stringify(item[0]);
                    out += "[[" + tmp + "], [" + item[1] + "]\n\n";
                }
                out += "}";
                console.log(out);
        } else console.log(content);
    } else console.log("Resulting dataset is empty. Try a different filter or filter on something else!");
}
    res.end();
}

var setVerbose = function () {
    VERBOSE = true;
}


/**
 * Display a helptext about the API.
 *
 * @param Object req The request
 * @param Object res The response
 */
router.get("/", (req, res) => {

    res.writeHead(200, "Content-Type: text/plain");
    res.write("Welcome to BTH's lecture hall API. This is what the API can help you with.\n\n" +
        " /                         Display this helptext.\n" +
        " /room/list                Show all halls." +
        " /room/view/id/:number     Show details of lecture hall with supplied :number.\n" +
        " /room/view/house/:house   Show all lecture halls in the supplied :house.\n" +
        " /room/search/:search      Search for supplied :search in all fields.\n" +
        " /room/search/:searchp     Priority search. See documentation for full explanation!\n"
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

    var queryData = url.parse(req.url, true).query;
    var max = (queryData.max !== undefined) ? queryData.max : null;
    var message = "Attempting to get a list of all rooms.";
    try {
        server_body.getList(max);
    } catch (e) {
        message = e.message;
    }

    // Send the response
    sendJSONResponse(res, {
        "message": message,
        "result" : server_body.getList(max),
        "full list size": server_body.getSize()
    });
});

router.get("/room/view/id/:number", (req, res) => {

    var room = req.params.number;
    var message = "Attempting to get a list of all rooms.";
    try {
        server_body.getRoom(decodeURI(room));
    } catch (e) {
        message = e.message;
    }

    // Send the response
    sendJSONResponse(res, {
        "message": message,
        "result"    : server_body.getRoom(decodeURI(room))
    });
});

router.get("/room/view/house/:house", (req, res) => {

    var queryData = url.parse(req.url, true).query;
    var max = (queryData.max !== undefined) ? queryData.max : null;
    var house = req.params.number;
    var message = "Attempting to get a list of all rooms.";
    try {
        server_body.getRoomsOfHouse(decodeURI(house), max);
    } catch (e) {
        message = e.message;
    }

    // Send the response
    sendJSONResponse(res, {
        "message": message,
        "result"    : server_body.getRoomsOfHouse(decodeURI(house), max)
    });
});

router.get("/room/search/:search", (req, res) => {
    var queryData = url.parse(req.url, true).query;
    var max = (queryData.max !== undefined) ? queryData.max : null;
    var query = req.params.search;
    var message = "Searching all room details for substring hits on your query.";
    try {
        server_body.getFromSearch(decodeURI(query), max);
    } catch (e) {
        message = e.message;
    }

    // Send the response
    sendJSONResponse(res, {
        "message": message,
        "query"  : decodeURI(query),
        "result"    : server_body.getFromSearch(decodeURI(query), max)
    });
});

router.get("/room/searchp/:search", (req, res) => {

    var query = req.params.search;
    var message = "Searching all room details for substring hits on your query.";
    try {
        server_body.getFromSearch_prio(decodeURI(query));
    } catch (e) {
        message = e.message;
    }

    // Send the response
    sendJSONResponse(res, {
        "message": message,
        "query"  : decodeURI(query),
        "result"    : server_body.getFromSearch_prio(decodeURI(query))
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
exports.setVerbose = setVerbose;
