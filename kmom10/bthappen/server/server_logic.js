

/*
*
* Class for the server logic.
*
*/

class server_logic {

    constructor () {
        this.reset();
        this.init();
    }

    reset () {
        this.size = 0;
        this.list = [];
    }

    init () { 
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
        return this.list.filter(function (el){
            console.log(id);
            console.log(el.Salsnr);
            if (el.Salsnr === id) {
                return el;
            }
        });
    }

    getRoomsOfHouse(house) {
        return this.list.filter(function (el){
            if (el.Hus !== null){
                if (el.Hus.toLowerCase() === house.toLowerCase()) {
                    return el;
                }
            }
        });
    }

    getFromSearch(query) {
        return this.list.filter(function (el){

            if (el.Salsnr !== null) {
                if (el.Salsnr.toLowerCase().includes(query.toLowerCase())) {
                    return el;
                }
            }
            if (el.Salsnamn !== null) {
                if (el.Salsnamn.toLowerCase().includes(query.toLowerCase())) {
                    return el;
                }
            }
            if (el.Lat !== null) {
                if (el.Lat.includes(query)) {
                    return el;
                }
            }
            if (el.Long !== null) {
                if (el.Long.includes(query)) {
                    return el;
                }
            }
            if (el.Ort !== null) {
                if (el.Ort.toLowerCase().includes(query.toLowerCase())) {
                    return el;
                }
            }
            if (el.Hus !== null){
                if (el.Hus.toLowerCase().includes(query.toLowerCase())) {
                    return el;
                }
            }
            if (el.Våning !== null) {
                if (el.Våning.includes(query)) {
                    return el;
                }
            }
            if (el.Typ !== null) {
                if (el.Typ.toLowerCase().includes(query.toLowerCase())) {
                    return el;
                }
            }
            if (el.Storlek !== null) {
                if (el.Storlek.includes(query)) {
                    return el;
                }
            }
        });
    }

    getSize() {
        return this.size;
    }
}



export default server_logic;
