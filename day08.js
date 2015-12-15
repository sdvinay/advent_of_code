function countStringSizeDiff(str) {
	// 2 for the wrapping quote marks
	var origLen = str.length;
	str = str.substr(1,str.length-2);
	// 1 each for \\ and \"
	str = str.replace(/\\\\|\\\"/g, '_');

	// 3 (4-1) for hex \x..
	str = str.replace(/\\x\w\w/g, 'X');
	return origLen - str.length;
}
//* // literal/in-line test cases go here

var testStrings = [ '""', '"abc"', '"aaa\\"aaa"', '"\\x27"'];
console.log (testStrings.map(countStringSizeDiff)); // expect 2,2,3,5
// */

//*

var diffCount = 0;
function processLine(line) {
	var count = countStringSizeDiff(line); 
	diffCount+= count;
	console.log(count);
}

function onClose() {
	console.log(diffCount);
}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input08.txt'),
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);

// */

