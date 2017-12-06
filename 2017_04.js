//* // literal/in-line test cases go here
checkPassphrase("aa bb cc dd aa");
// */

//*

function checkPassphrase(phrase) {
	words = phrase.split(" ");
	var matches = {};
	for (var i in words) {
		word = words[i];
		if (matches[word] == true) {
			return false;
		}
		matches[word] = true;
	}
	return true;
}

var validPhrases = 0;
function processLine(line) {
	if (checkPassphrase(line)) {
		validPhrases++;
	}
}

function onClose() {
	console.log(validPhrases);
}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input2017_04.txt'), 
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);

// */

