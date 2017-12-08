//* // literal/in-line test cases go here
// */

//*

// For part 1, we are looking for the root node
// This is the only node that won't appear on the RHS of any rule
// So just enumerate the nodes, and the nodes that appear on the RHSs,
// and find the one node that isn't in the RHS of any rule.

var programs = [];
var discWeights = {};
var children = [];
var towers = [];

function processLine(line) {
	var leftFields = line.match(/(^\w+) (\(\d+\))/);
	programs.push(leftFields[1]);
	discWeights[leftFields[1]] = leftFields[2];

	var match = line.match(/^\w+.*-> (.*)/);
	if (match) {
		children.push(...match[1].split(', '));
	}
}

function onClose() {
	console.log(programs);
	console.log(children);
	console.log(discWeights);

	for (i in programs) {
		if (!children.includes(programs[i])) {
			console.log(programs[i]);
			break;
		}
	}
}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input2017_07_sample.txt'),
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);

// */

