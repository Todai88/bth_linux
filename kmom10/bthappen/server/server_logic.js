

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
        console.log("Reading...");
        function reader(path, cbf){
            var fs = require('fs');
            fs.readFile(path, 'utf8', function (err, data) {
                if (err) throw err;
                cbf(data); //calling callbackfunction (cbf) with return.
            });
        }
        var obj;
        reader(__dirname + '/../salar.json', function(data){
            obj = data; 
        });
        this.list = obj;
        this.size = this.list.length;
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
