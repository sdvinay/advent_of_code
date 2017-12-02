//* // literal/in-line test cases go here
// */

//*
var checksum = 0;

function processLine(line) {
	var fields = line.split("	").map(x => parseInt(x));
	var min = Math.min(...fields);
	var max = Math.max(...fields);
	checksum = checksum + max - min;
	// console.log(checksum);
}

function onClose() {
	console.log(checksum);
}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input2017_02.txt'),
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);

// */

