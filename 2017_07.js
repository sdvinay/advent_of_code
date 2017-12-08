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
var towers = {};

// if a leaf node, return your own weight
// otherwise, recursively get your children
function getTowerWeight(towerBase) {
	var weight = discWeights[towerBase];
/*	if (towers[towerBase]) {
		for (child in towers[towerBase]) {
			weight += getTowerWeight(towers[towerBase][child]);
		}
	}
*/	return weight; // interim state, just return the weight of the base for now
}

function processLine(line) {
	var leftFields = line.match(/(^\w+) \((\d+)\)/);
	programs.push(leftFields[1]);
	discWeights[leftFields[1]] = parseInt(leftFields[2]);

	var towerMatches = line.match(/(^\w+).*-> (.*)/);
	if (towerMatches) {
		towers[towerMatches[1]] = towerMatches[2];
		children.push(...towerMatches[2].split(', '));
	}
}

function onClose() {
	console.log(programs);
	console.log(children);
	console.log(discWeights);
	console.log(towers);

	// Part 1
	for (i in programs) {
		if (!children.includes(programs[i])) {
			console.log(programs[i]);
			break;
		}
	}

	// Tests for Part 2
	console.log(getTowerWeight('ugml')); // expect 
	console.log(getTowerWeight('padx')); // expect 
	console.log(getTowerWeight('fwft')); // expect 
}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input2017_07_sample.txt'),
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);

// */

