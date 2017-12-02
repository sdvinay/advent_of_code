/* // literal/in-line test cases go here
console.log(findDivisor([5,9, 2, 8]));
console.log(findDivisor([9, 4, 7, 3]));
console.log(findDivisor([3, 8, 6, 5]));
// */

//*
var checksum = 0;

function calcChecksum(fields) {
	var min = Math.min(...fields);
	var max = Math.max(...fields);
	return max - min;
}

function findDivisor(fields) {
	for (let x of fields) {
		for (let y of fields) {
			if (x != y) {
				if (x % y == 0) {
					return x/y;
				}
			}
		}
	}
}

function processLine(line) {
	var fields = line.split("	").map(x => parseInt(x));
	checksum = checksum + findDivisor(fields);
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

