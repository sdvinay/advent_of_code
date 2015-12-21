//* // literal/in-line test cases go here
// */

//*

var replacement_rules = {};

function addRule(matches) {
	if (matches[1] in replacement_rules) {
		replacement_rules[matches[1]].push(matches[2]);
	} else {
		replacement_rules[matches[1]] = [matches[2]];
	}
}

// performs one step, getting all possible unique replacements
function getAllReplacements(molecules) {
	var outputs = [];
	for (var h=0; h < molecules.length; h++) {
		var molecule = molecules[h];
		var atoms = molecule.match(/([A-Ze][abcdf-z]*)/g);
		for (var i = 0; i < atoms.length; i++) {
			if (atoms[i] in replacement_rules) {
				var replacements = replacement_rules[atoms[i]];
				var before = atoms.slice(0,i).join('');
				var after = atoms.slice(i+1).join('');
				for (var j = 0; j < replacements.length; j++) {
					var output = before + replacements[j] + after;
					if (outputs.indexOf(output) < 0) outputs.push(output);
				}
			}
		}
	}
	return outputs;
}

function produceMolecule(input, output) {
	var iterations = 0;
	// TODO
	return iterations;
}

function processLine(line) {
	var matches = line.match(/(\w+) => (\w+)/);
	// First look for replacement instructions
	if (matches && matches.length>0) {
		addRule(matches);
	} else if (line.length>0) {
		//otherwise perform a calibration
		var outputs = getAllReplacements([line]);
		console.log(outputs.length);
		var iterations = produceMolecule('e', line);
		console.log(iterations);
	}

}

function onClose() {
	//console.log(replacement_rules);
}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input19.txt'),
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);

// */

