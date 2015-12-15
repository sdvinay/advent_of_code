//* // literal/in-line test cases go here
// */

//*

function processLine(line) {
	// TODO 
}

function onClose() {
	// TODO 
}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/.txt'), // TODO put filename here
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);

// */

