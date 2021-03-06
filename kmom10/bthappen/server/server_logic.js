
<<<<<<< HEAD
// jscs:disable
=======

>>>>>>> 4ea76b5d41b436f0964e8f18bd02120fc8d84a61
/*
*
* Class for the server logic.
*
*/
<<<<<<< HEAD
/* jshint ignore:start */
=======

>>>>>>> 4ea76b5d41b436f0964e8f18bd02120fc8d84a61
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
<<<<<<< HEAD
            if (err) {
                throw err;
            }
=======
            if (err) throw err;
>>>>>>> 4ea76b5d41b436f0964e8f18bd02120fc8d84a61
            this.list = JSON.parse(data);
            this.size = this.list.length;
        });

    }

    getList(max = null) {
        if (max !== null) {
            return this.list.slice(0, max);
        } else {
            return this.list;
        }
    }

    getRoom(id) {
        return this.list.filter(function (el){
            if (el.Salsnr === id) {
                return el;
            }
        });
    }

    getRoomsOfHouse(house, max = null) {
        var out = this.list.filter(function (el){
            if (el.Hus !== null){
                if (el.Hus.toLowerCase() === house.toLowerCase()) {
                    return el;
                }
            }
        });
        if (max !== null) {
            return out.slice(0, max);
        } else {
            return out;
        }
    }

    getFromSearch(query, max = null) {

        var out = this.list.filter(function (el){

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
        if (max !== null) {
            return out.slice(0, max);
        } else {
            return out;
        }
    }

    keyPriority(key) {
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
        if(key_val.toLowerCase() === val.toLowerCase()) return 50;
        if(key_val.slice(0, val.length).toLowerCase() === val.toLowerCase()) return 30;
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

        if (out_list[0][1] > 0){
            return [object, out_list[0]];
        }
        return null;
    }
    getFromSearch_prio(query, max) {
        var list = [];
        for (var object of this.list){
            var temp = this.getPriority(object, query);
            if (temp !== null) {
                list.push(temp);
            }
        }
        list = list.sort(function(a, b) {
            return b[1][1] - a[1][1];
        });

        if (max !== null) {
            return list.slice(0, max);
        } else {
            return list;
        }
    }

    getSize() {
        return this.size;
    }
}



export default server_logic;
<<<<<<< HEAD
/* jshint ignore:end */
=======
>>>>>>> 4ea76b5d41b436f0964e8f18bd02120fc8d84a61
