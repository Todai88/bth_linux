"use strict";

import server from "./serverWithQueries.js";

server.listen(1337);

console.log("Simple server with routes listening to port 1337");
console.log("Try routes '/' and add a querystring after it!");
