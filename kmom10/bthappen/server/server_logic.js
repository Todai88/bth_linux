

/*
*
* Class for the server logic.
*
*/

class server_logic {

    constructor () {
        console.log("Constructing...");
        this.reset();
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
        // console.log("Reading...");
        // this.reset();
        // function reader(path, cbf){
        //     var fs = require('fs');
        //     fs.readFile(path, 'utf8', function (err, data) {
        //         if (err) throw err;
        //         cbf(data); //calling callbackfunction (cbf) with return.
        //     });
        // }
        // var obj = "";
        // reader(__dirname + '/../salar.json', function(data){
        //     //console.log(data);
        //     obj = data;
        // });
        // console.log(obj);
        // this.list = obj;
        // this.size = obj.length;
        var fs = require('fs');
        fs.readFile(__dirname + '/../salar.json', (err, data) => {
            if (err) throw err;
            this.list = JSON.parse(data);
            this.size = this.list.length;
        });
    }

    getList() {
        //return JSON.stringify(this.list);
        return this.list;
    }

    getRoom(id) {
        console.log("Attempting to filter on: " + id);
        return this.list.filter(function (el){
            console.log(el);
            if (el.Salsnr === id) {
                return el;
            }
        });
    }

    getSize() {
        return this.size;
    }
}



export default server_logic;
