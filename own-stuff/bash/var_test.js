#!/bin/env node

console.log(process.env.EDITOR);

if ('EDITOR' in process.env) {

	console.log("EDITOR='" + process.env.EDITOR + "'");
}
else {
	console.log("EDITOR is not set");
}

