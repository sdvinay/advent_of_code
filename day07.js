// Construct and evaluate a "circuit", based on instructions
// Each instruction will become a function that lives in rules
// Each rule is only evaluated once, and will memoize its value in values
var rules = {};
var values = {};

// Regular expressions for the different types of instructions
var reInt = /^(\d+) -> ([a-z]+)/;
var reAndOrNum = /^(\d+) (AND|OR) ([a-z]+) -> ([a-z]+)/;
var reAndOr = /^([a-z]+) (AND|OR) ([a-z]+) -> ([a-z]+)/;
var reNot = /^NOT ([a-z]+) -> ([a-z]+)/;
var reShift = /^([a-z]+) (.SHIFT) (\d+) -> ([a-z]+)/;
var rePipe = /^([a-z]+) -> ([a-z]+)/;

// Get memoized if available, otherwise evaluate
function get(name) {
	if (name in values) {
		return values[name];
	} else {
		return rules[name]();
	}
}

// An instructionProcessor is a regexp and the function that creates a rule from the matches
var instructionProcessors = [ 
	{re: reInt, fn: createIntRule},
	{re: reAndOrNum, fn: createAndOrNumRule},
	{re: reAndOr, fn: createAndOrRule},
	{re: reNot, fn: createNotRule},
	{re: rePipe, fn: createPipeRule},
	{re: reShift, fn: createShiftRule}
];

// match the instruction to its type, and create the corresponding rule
function processLine(str) {
	for (var i in instructionProcessors) {
		var proc = instructionProcessors[i];
		var matches = str.match(proc.re);
		if (matches) {
			proc.fn(matches);
			return;
		}
	}
	throw new Error('line didnt match pattern: '+str);
}

// These are all the create*Rule functions, for each instruction type
function createIntRule(matches) {
	var val = parseInt(matches[1]);
	rules[matches[2]] = function() { return val;};
	values[matches[2]] = val;
}

function createAndOrNumRule(matches) {
	var v1 = parseInt(matches[1]);
	var v2 = matches[3];
	var name = matches[4];
	if (matches[2] === 'OR') {
		rules[name] = function() { var val = v1 | get(v2); values[name]=val; return val;};
	}
	if (matches[2] === 'AND') {
		rules[name] = function() { var val = v1 & get(v2); values[name]=val; return val;};
	}
}

function createAndOrRule(matches) {
	var v1 = matches[1];
	var v2 = matches[3];
	var name = matches[4];
	if (matches[2] === 'OR') {
		rules[name] = function() { var val = get(v1) | get(v2); values[name]=val; return val;};
	}
	if (matches[2] === 'AND') {
		rules[name] = function() { var val = get(v1) & get(v2); values[name]=val; return val;};
	}
}

function createNotRule(matches) {
	var v1 = matches[1];
	var name = matches[2];
	rules[name] = function() { var val = ((~get(v1))+(2<<15)); values[name]=val; return val;};
}

function createShiftRule(matches) {
	var v1 = matches[1];
	var dist = matches[3];
	var name = matches[4];
	if (matches[2] === 'LSHIFT') {
		rules[name] = function() { var val = get(v1) << dist; values[name] = val; return val; };
	}
	if (matches[2] === 'RSHIFT') {
		rules[name] = function() { var val = get(v1) >> dist; values[name] = val; return val; };
	}
}

function createPipeRule(matches) {
	var v1 = matches[1];
	var name = matches[2];
	rules[name] = function() { var val = get(v1); values[name]=val; return val;};
}


//*
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input07.txt'),
	  output: process.stdout,
	  terminal: false
  });

rl.on('line', processLine);

rl.on('close', function () {
		var a = rules['a']();
		console.log(a);
		values = {};
		values['b'] = a;
		console.log(rules['a']());

		debugger;
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