"use strict";

import server from './serverWithRoutes.js';

server.listen(1337);

console.log("Simple server with routes listening on port 1337.");

console.log("Try routes '/' or '/about' to get a match!");
