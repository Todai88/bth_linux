/**
 * Front for bthappen
 */

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

                res.on('data', (chunk) => {
                    data += chunk;
                }).on('end', () => {
                    if (res.statusCode === 200) {
                        resolve(data);
                    } else {
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

    listAll() {
        console.log(this.server + "/room/list");
        return this.httpGet("/room/list");
    }

    getBasedOnNumber(number) {
        return this.httpGet("/room/view/id/" + number);
    }
    getBasedOnHouse(house) {
        return this.httpGet("/room/view/house/" + house);
    }
    getBasedOnQuery(query) {
        return this.httpGet("/room/search/" + query);
    }
}

export default BthappenClient;
