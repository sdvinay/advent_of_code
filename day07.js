var rules = {};
var values = {};

var reInt = /^(\d+) -> ([a-z]+)/;
var reAndOrNum = /^(\d+) (AND|OR) ([a-z]+) -> ([a-z]+)/;
var reAndOr = /^([a-z]+) (AND|OR) ([a-z]+) -> ([a-z]+)/;
var reNot = /^NOT ([a-z]+) -> ([a-z]+)/;
var reShift = /^([a-z]+) (.SHIFT) (\d+) -> ([a-z]+)/;
var rePipe = /^([a-z]+) -> ([a-z]+)/;

function get(name) {
	if (name in values) {
		return values[name];
	} else {
		return rules[name]();
	}
}

function processLine(str) {
	var matches = str.match(reInt);
	if (matches) {
		var val = parseInt(matches[1]);
		rules[matches[2]] = function() { return val;};
		values[matches[2]] = val;
		return;
	}
	matches = str.match(reAndOrNum);
	if (matches) {
		var v1 = parseInt(matches[1]);
		var v2 = matches[3];
		var name = matches[4];
		if (matches[2] === 'OR') {
			rules[name] = function() { var val = v1 | get(v2); values[name]=val; return val;};
		}
		if (matches[2] === 'AND') {
			rules[name] = function() { var val = v1 & get(v2); values[name]=val; return val;};
		}
		return;
	}
	matches = str.match(reAndOr);
	if (matches) {
		var v1 = matches[1];
		var v2 = matches[3];
		var name = matches[4];
		if (matches[2] === 'OR') {
			rules[name] = function() { var val = get(v1) | get(v2); values[name]=val; return val;};
		}
		if (matches[2] === 'AND') {
			rules[name] = function() { var val = get(v1) & get(v2); values[name]=val; return val;};
		}
		return;
	}
	matches = str.match(reNot);
	if (matches) {
		var v1 = matches[1];
		var name = matches[2];
		rules[name] = function() { var val = ((~get(v1))+(2<<15)); values[name]=val; return val;};
		return;
	}
	matches = str.match(reShift);
	if (matches) {
		var v1 = matches[1];
		var dist = matches[3];
		var name = matches[4];
		if (matches[2] === 'LSHIFT') {
			rules[name] = function() { var val = get(v1) << dist; values[name] = val; return val; };
		}
		if (matches[2] === 'RSHIFT') {
			rules[name] = function() { var val = get(v1) >> dist; values[name] = val; return val; };
		}
		return;
	}
	matches = str.match(rePipe);
	if (matches) {
		var v1 = matches[1];
		var name = matches[2];
		rules[name] = function() { var val = get(v1); values[name] = val; return val; };
		return;
	}
	throw new Error('line didnt match pattern: '+str);
}


//*
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input07.txt'),
	  output: process.stdout,
	  terminal: false
  });

rl.on('line', processLine);

rl.on('close', function () {
		console.log(rules);
		console.log(values);
		console.log(rules['a']());
		console.log(rules['h']());
		console.log(rules['i']());
		console.log(values);
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
