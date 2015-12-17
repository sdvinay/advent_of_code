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

/* // literal/in-line test cases go here
console.log(matchAunts(needle, {pomeranians: 10, cars: 7, trees: 2})); //47
console.log(matchAunts(needle, {pomeranians: 3})); // should match
processLine('Sue 488: cars: 7, akitas: 10, samoyeds: 5'); //488

// */

//*
function eq(p1, p2) { return p1 === p2; }
function lt(p1, p2) { return p1 < p2; }
function gt(p1, p2) { return p1 > p2; }

function getComparator(prop) {
	switch(prop) {
		case 'cats':
		case 'trees':
			return (lt); // comment out lines 28,31 to go back to part 1
		case 'pomeranians':
		case 'goldfish':
			return (gt);
		default:
			return (eq);
	}
}

function matchAunts(aunt1, aunt2) {
	for (prop in aunt2) {
		var comparator = getComparator(prop);
		if (comparator(aunt1[prop], aunt2[prop]) === false) {
			return false;
		}
	}
	return true;
}

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

var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input16.txt'), 
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);

// */

