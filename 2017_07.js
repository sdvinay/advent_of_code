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

// start with your own weight
// if you have children, recursively add their weights
function getTowerWeight(towerBase) {
	var weight = discWeights[towerBase];
	var children = towers[towerBase];
	if (children) {
		for (i in children) {
			weight += getTowerWeight(children[i]);
		}
	}
	return weight; // interim state, just return the weight of the base for now
}

function findUnbalancedPlate(towerBase) {
	console.log("findUnbalancedPlate " + towerBase);
	var unbalanced = false
	var children = towers[towerBase];
	if (children) {
		console.log(children);
		var childWeight = getTowerWeight(children[0]);
		for (i in children) {
			if (getTowerWeight(children[i]) != childWeight) {
				unbalanced = true;
			}
		}
		if (unbalanced) {
			var unbalancedChild = children.find(child => findUnbalancedPlate(child));
			if (unbalancedChild) {
				return children[i];
			}

		}
	}
	return unbalanced ? towerBase : false;

}

function processLine(line) {
	var leftFields = line.match(/(^\w+) \((\d+)\)/);
	programs.push(leftFields[1]);
	discWeights[leftFields[1]] = parseInt(leftFields[2]);

	var towerMatches = line.match(/(^\w+).*-> (.*)/);
	if (towerMatches) {
		var ourChildren = towerMatches[2].split(', ');
		children.push(...ourChildren);
		towers[towerMatches[1]] = ourChildren;
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

	console.log(getTowerWeight('xhth')); // expect 57
	console.log(getTowerWeight('ugml')); // expect 
	console.log(getTowerWeight('padx')); // expect 
	console.log(getTowerWeight('fwft')); // expect 

	console.log(findUnbalancedPlate('tknk'));
	console.log(findUnbalancedPlate('ugml'));
	console.log(findUnbalancedPlate('padx'));
}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input2017_07_sample.txt'),
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);

// */

