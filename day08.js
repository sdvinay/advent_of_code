function countStringSizeDiffDecode(str) {
	// 2 for the wrapping quote marks
	var origLen = str.length;
	str = str.substr(1,str.length-2);
	// 1 each for \\ and \"
	str = str.replace(/\\\\|\\\"/g, '_');

	// 3 (4-1) for hex \x..
	str = str.replace(/\\x\w\w/g, 'X');
	return origLen - str.length;
}

function countStringSizeDiffEncode(str) {
	var origLen = str.length;
	str = str.replace(/\\/g, '--');
	str = str.replace(/"/g, '==');
	return str.length+2 - origLen;
}
//* // literal/in-line test cases go here

var testStrings = [ '""', '"abc"', '"aaa\\"aaa"', '"\\x27"'];
console.log (testStrings.map(countStringSizeDiffDecode)); // expect 2,2,3,5
console.log (testStrings.map(countStringSizeDiffEncode)); // expect 2,2,3,5
// */

//*

var diffCountDecode = 0;
var diffCountEncode = 0;
function processLine(line) {
	var count = countStringSizeDiffDecode(line); 
	diffCountDecode+= count;
	diffCountEncode+= countStringSizeDiffEncode(line);
	console.log(count);
}

function onClose() {
	console.log(diffCountEncode);
	console.log(diffCountDecode);
}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input08.txt'),
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);

// */

