

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
    keyPriority(key) {
        console.log("Testing: " + key);
        switch (key) {
            case "Salsnr":
                return 25;
                break;
            case "Salsnamn":
                return 20;
                break;
            case "Lat":
                return 5;
                break;
            case "Long":
                return 5;
                break;
            case "Ort":
                return 10;
                break;
            case "Hus":
                return 15;
                break;
            case "Våning":
                return 10;
                break;
            case "Typ":
                return 10;
                break;
            case "Storlek":
                return 5;
                break;
        }
    }
    valuePriority(val, key_val){
        if(key_val === val) return 50;
        if(key_val.slice(0, val.length) === val) return 30;
        return 10;
    }
    getPriority (object, query) {
        var out_list = [];
        for (var key in object) {
            var score = 0;
            if (object.hasOwnProperty(key)) {
                if(object[key] !== null) {
                    if(object[key].toLowerCase().includes(query.toLowerCase())){
                        score+= this.keyPriority(key) + this.valuePriority(query, object[key]);
                    }
                }
            }
            out_list.push([key, score]);
        }
        out_list = out_list.sort(function(a, b) {
            return b[1] - a[1];
        });
        return [object, out_list];
    }
    getFromSearch_prio(query) {
        var list = [];
        for (var object of this.list){
            //list.push(getPriority(object, query));
            list.push(this.getPriority(object, query));
        }
        return list;
    }

    getSize() {
        return this.size;
    }
}



export default server_logic;
