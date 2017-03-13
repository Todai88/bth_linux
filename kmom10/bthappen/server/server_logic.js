

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
        this.reset();
        this.readJSON();
    }

    readJSON() {
        var fs = require('fs');
        console.log("Reading...");
        fs.readFile(__dirname + '/../salar.json', 'utf8', function (err, data) {
            if (err) throw err; 
            this.list = JSON.parse(data);
            this.size = this.list.length;
        });
    }

    getList() {
        return JSON.stringify(this.list);
    }

    getSize() {
        return this.size;
    }
}



export default server_logic;
