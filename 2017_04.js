//* // literal/in-line test cases go here
// */

//*

function processLine(line) {
	// TODO 
	words = line.split(" ");
	var matches = {};
	debugger;
	matches['pphsv'] = true;
	for (var word in words) {
		if (matches[word] == true) {
			console.log ("found duplicate: " + word);
		}
		matches[word] = true;

	}
}

function onClose() {
	// TODO 
}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input2017_04.txt'), 
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);

// */

