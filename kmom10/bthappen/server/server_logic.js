

/*
*
* Class for the server logic.
*
*/

class server_logic {

    constructor () {
        console.log("Constructing...");
        this.init();
    }

    reset () {
        this.size = 0;
        this.list = [];
    }

    init () {
        console.log("Initiating...");
        this.readJSON();
    }

    readJSON() {
        this.reset();
        var fs = require('fs');
        console.log("Reading...");
        var object;
        fs.readFile(__dirname + '/../salar.json', 'utf8', function (err, data) {
            if (err) throw err;
            object = JSON.parse(data);
        });
        console.log(object);
        this.list = object;
        this.size = object.length;
    }

    getList() {
        console.log(this.list);
        return JSON.stringify(this.list);
    }

    getSize() {
        return this.size;
    }
}



export default server_logic;
