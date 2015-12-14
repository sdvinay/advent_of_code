// Construct and evaluate a "circuit", based on instructions
// Each instruction will become a function that lives in rules
// Each rule is only evaluated once, and will memoize its result in values
var rules = {};
var values = {};

// Get memoized value if available, otherwise evaluate the rule (and memoize the result)
function get(name) {
	if (!isNaN(parseInt(name))) {
		return parseInt(name);
	}
	if (name in values) {
		return values[name];
	} else if (name in rules) {
		return memoize(name, rules[name]());
	} else {
		throw new Error ('Cant get value for name (no memoized value or rule): ' + name);
	}
}

function memoize(name, val) {
	values[name] = val;
	return val;
}


// An instructionProcessor is a regexp and the function that creates a rule from the matches
var instructionProcessors = [ 
	{fn: createPipeRule,  re: /^(\w+) -> ([a-z]+)/},
	{fn: createNotRule,   re: /^NOT ([a-z]+) -> ([a-z]+)/},
	{fn: createAndOrRule, re: /^(\w+) (AND|OR) ([a-z]+) -> ([a-z]+)/},
	{fn: createShiftRule, re: /^([a-z]+) (.SHIFT) (\d+) -> ([a-z]+)/}
];

// match the instruction by regexp, and create the corresponding rule
function processLine(str) {
	for (var i in instructionProcessors) {
		var proc = instructionProcessors[i];
		var matches = str.match(proc.re);
		if (matches) {
			var dest = matches[matches.length-1]; // assumes last match is the destination (e.g '-> x')
			proc.fn(dest, matches); // call to create the rule
			return;
		}
	}
	throw new Error('line didnt match pattern: '+str);
}

// These are the rules for each specific instruction type
function createPipeRule(dest, matches) {
	var in1 = matches[1];
	rules[dest] = function() { return get(in1);};
}

function createNotRule(dest, matches) {
	var in1 = matches[1];
	rules[dest] = function() { return ((~get(in1))+(2<<15));};
}

function createAndOrRule(dest, matches) {
	var in1 = matches[1];
	var in2 = matches[3];
	switch(matches[2]) {
		case 'OR' : rules[dest] = function() { return get(in1) | get(in2);}; break;
		case 'AND': rules[dest] = function() { return get(in1) & get(in2);}; break;
		default: throw new Error('line didnt match pattern: '+str);
	}
}

function createShiftRule(dest, matches) {
	var in1 = matches[1];
	var dist = parseInt(matches[3]); // assumes dist is a literal, not a reference
	switch(matches[2]) {
		case 'LSHIFT': rules[dest] = function() { return get(in1) << dist;}; break;
		case 'RSHIFT': rules[dest] = function() { return get(in1) >> dist;}; break;
		default: throw new Error('line didnt match pattern: '+str);
	}
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
