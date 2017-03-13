

/*
*
* Class for the server logic.
*
*/

class server_logic {

    constructor () {
        this.init();
    }

    reset () {
        this.size = 0;
        this.list;
    }

    init () {
        this.readJSON();
    }

    readJSON() {
        var fs = require('fs');
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
