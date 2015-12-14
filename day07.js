// Construct and evaluate a "circuit", based on instructions
// Each instruction will become a function that lives in rules
// Each rule is only evaluated once, and will memoize its result in values
var rules = {};
var values = {};

// Regular expressions for the different types of instructions
var reAndOr = /^(\w+) (AND|OR) ([a-z]+) -> ([a-z]+)/;
var reNot = /^NOT ([a-z]+) -> ([a-z]+)/;
var reShift = /^([a-z]+) (.SHIFT) (\d+) -> ([a-z]+)/;
var rePipe = /^(\w+) -> ([a-z]+)/;

// Get memoized value if available, otherwise evaluate the rule (and memoize the result)
function get(name) {
	if (!isNaN(parseInt(name))) {
		return parseInt(name);
	}
	if (name in values) {
		return values[name];
	} else {
		return memoize(name, rules[name]());
	}
}

function memoize(name, val) {
	values[name] = val;
	return val;
}


// An instructionProcessor is a regexp and the function that creates a rule from the matches
var instructionProcessors = [ 
	{re: reAndOr, fn: createAndOrRule},
	{re: reNot, fn: createNotRule},
	{re: rePipe, fn: createPipeRule},
	{re: reShift, fn: createShiftRule}
];

// match the instruction by regexp, and create the corresponding rule
function processLine(str) {
	for (var i in instructionProcessors) {
		var proc = instructionProcessors[i];
		var matches = str.match(proc.re);
		if (matches) {
			var dest = matches[matches.length-1]; // assumes last match is the destination (e.g '-> x')
			proc.fn(dest, matches);
			return;
		}
	}
	throw new Error('line didnt match pattern: '+str);
}

function createAndOrRule(dest, matches) {
	var in1 = matches[1];
	var in2 = matches[3];
	if (matches[2] === 'OR') {
		rules[dest] = function() { return get(in1) | get(in2);};
	}
	if (matches[2] === 'AND') {
		rules[dest] = function() { return get(in1) & get(in2);};
	}
}

function createNotRule(dest, matches) {
	var in1 = matches[1];
	rules[dest] = function() { return ((~get(in1))+(2<<15));};
}

function createShiftRule(dest, matches) {
	var in1 = matches[1];
	var dist = parseInt(matches[3]);
	if (matches[2] === 'LSHIFT') {
		rules[dest] = function() { return get(in1) << dist;};
	}
	if (matches[2] === 'RSHIFT') {
		rules[dest] = function() { return get(in1) >> dist;};
	}
}

function createPipeRule(dest, matches) {
	var in1 = matches[1];
	rules[dest] = function() { return get(in1);};
}


//*
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input07.txt'),
	  output: process.stdout,
	  terminal: false
  });

rl.on('line', processLine);

rl.on('close', function () {
		var a = get('a');
		console.log(a);
		// for part 2, we're overriding b with the old value of a
		values = {};
		values['b'] = a;
		console.log(get('a'));
});
// */

/*
processLine('123 -> x');
processLine('456 -> y');
processLine('x AND y -> d');
processLine('x OR y -> e');
processLine('x LSHIFT 2 -> f');
processLine('y RSHIFT 2 -> g');
processLine('NOT x -> h');
processLine('NOT y -> i');
console.log(rules);
console.log(rules['d']());
console.log(rules['e']());
console.log(rules['f']());
console.log(rules['g']());
console.log(rules['h']());
console.log(rules['i']());
// */
