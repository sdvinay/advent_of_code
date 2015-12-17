var needle = {children: 3,
	cats: 7,
	samoyeds: 2,
	pomeranians: 3,
	akitas: 0,
	vizslas: 0,
	goldfish: 5,
	trees: 3,
	cars: 2,
	perfumes: 1
};

//* // literal/in-line test cases go here
console.log(matchAunts(needle, {pomeranians: 10, cars: 7, trees: 2})); //47
console.log(matchAunts(needle, {pomeranians: 3})); // should match
processLine('Sue 488: cars: 7, akitas: 10, samoyeds: 5'); //488

// */

//*

function matchAunts(aunt1, aunt2) {
	for (prop in aunt2) {
		if (aunt2[prop] !== aunt1[prop]) {
			return false;
		}
	}
	return true;
}

var re = /Sue (\d+): (.*)/;
function processLine(line) {
	var matches = line.match(/Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/);
	var aunt = {};
   	aunt[matches[2]] = parseInt(matches[3]);
   	aunt[matches[4]] = parseInt(matches[5]);
   	aunt[matches[6]] = parseInt(matches[7]);
	if (matchAunts(needle, aunt) === true) {
		console.log(matches[1]);
	}
}

function onClose() {

}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input16.txt'), 
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);

// */

