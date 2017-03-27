/**
 * Front for bthappen
 */
<<<<<<< HEAD
// jscs:disable
=======

>>>>>>> 4ea76b5d41b436f0964e8f18bd02120fc8d84a61
var http = require("http");



/**
 * Class for Gomoku board.
 *
 */
class BthappenClient {

    /**
     * Constructor.
     *
     */
    constructor() {
        this.init();
    }

    init() {
        this.VERBOSE = false;
    }
    setVerbose(bool) {
        this.VERBOSE = bool;
    }
    /**
     * Set the url of the server to connect to.
     *
     * @param  String url to use to connect to the server.
     *
     */
    setServer(server, port) {
        this.server = "http://" + server + ":" + port;
    }



    /**
     * Make a HTTP GET request, wrapped in a Promise.
     *
     * @param  String url to connect to.
     *
     * @return Promise
     *
     */
    httpGet(url) {
        return new Promise((resolve, reject) => {
            http.get(this.server + url, (res) => {
                var data = "";
                if(this.VERBOSE){
                    console.log(`
/**********     DEVELOPMENT OUTPUT     ***************/

Attempting to send request to ${this.server + url}

/*****************************************************/`
);
                }
                res.on('data', (chunk) => {
                    data += chunk;
                }).on('end', () => {
                    if (res.statusCode === 200) {
                        if(this.VERBOSE){
                            console.log(`
/**********     DEVELOPMENT OUTPUT     ***************/

Response code 200 OK. Parsing data for pretty printing.

/*****************************************************/
`);
                        }
                        resolve(data);

                    } else {
<<<<<<< HEAD
                        if(this.VERBOSE) {
                            console.log("Response code not 200.. Failed. Status code: " + res.statusCode);
                        }
=======
                        if(this.VERBOSE) console.log("Response code not 200.. Failed. Status code: " + res.statusCode);
>>>>>>> 4ea76b5d41b436f0964e8f18bd02120fc8d84a61
                        reject(data);
                    }
                }).on('error', (e) => {
                    reject("Got error: " + e.message);
                });
            });
        });
    }

    /**
     * Return all items from server
     *
     * @return Promise
     *
     */

    listAll(max = null) {
        if (max !== null) {
            return this.httpGet("/room/list?max=" + max);
        }
        return this.httpGet("/room/list");
    }

    getBasedOnNumber(number, max = null) {
        if (max !== null) {
            return this.httpGet("/room/view/id/" + number + "?max=" + max);
        }
        return this.httpGet("/room/view/id/" + number);
    }
    getBasedOnHouse(house, max = null) {
        if (max !== null) {
            return this.httpGet("/room/view/house/" + house + "?max=" + max);
        }
        return this.httpGet("/room/view/house/" + house);
    }

    getBasedOnQuery(query, max = null) {
        if (max !== null) {
            return this.httpGet("/room/search/" + query + "?max=" + max);
        }
        return this.httpGet("/room/search/" + query);
    }

    getBasedOnAlgorithm(query, max = null) {
        if (max !== null) {
            return this.httpGet("/room/searchp/" + query + "?max=" + max);
        }

        return this.httpGet("/room/searchp/" + query);
    }
}

export default BthappenClient;
