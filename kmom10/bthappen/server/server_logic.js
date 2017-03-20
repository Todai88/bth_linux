

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
        fs.readFile(__dirname + '/../salar.json', (err, data) => {
            if (err) throw err;
            this.list = data;
            this.size = this.list.length;
        });
    }

    getList() {
        this.readJSON();
        console.log(this.list);
        return JSON.stringify(this.list);
    }

    getSize() {
        return this.size;
    }
}



export default server_logic;
