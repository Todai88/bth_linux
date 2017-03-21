

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
    getPriority (object, query) {

    }
    getFromSearch_prio(query) {
        var index = 0;
        var list = this.list.filter(function (el){
            index++;
            return ["test", index];
        });
        console.log(list);
        list = list.sort(function(a,b) {
            return b[1] - a[1];
        });
        console.log(list);
    }

    getSize() {
        return this.size;
    }
}



export default server_logic;
