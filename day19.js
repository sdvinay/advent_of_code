//* // literal/in-line test cases go here
// */

//*

var replacement_rules_left = {};
var replacement_rules_right = {};

function addRule(matches) {
	if (matches[1] in replacement_rules_left) {
		replacement_rules_left[matches[1]].push(matches[2]);
	} else {
		replacement_rules_left[matches[1]] = [matches[2]];
	}
	for (var i = 2; i < matches.length; i++) {
		if (matches[i] in replacement_rules_right) {
			replacement_rules_right[matches[i]].push(matches[1]);
		} else {
			replacement_rules_right[matches[i]] = [matches[1]];
		}
	}
}

// performs one step, getting all possible unique replacements
function getAllReplacements(molecules) {
	var outputs = [];
	for (var h=0; h < molecules.length; h++) {
		var molecule = molecules[h];
		var atoms = molecule.match(/([A-Ze][abcdf-z]*)/g);
		for (var i = 0; i < atoms.length; i++) {
			if (atoms[i] in replacement_rules_left) {
				var replacements = replacement_rules_left[atoms[i]];
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

// performs one step backwards, getting all possible inputs
var getAllPossibleInputsTimesCalled = 0;
function getAllPossibleInputs(molecules) {
	getAllPossibleInputsTimesCalled++;
	// for every match of a RHS of a rule in the molecule, replace it back
	var inputs = [];
	var RHSs = Object.keys(replacement_rules_right);
	//debugger;
	for (var h=0; h < molecules.length; h++) {
		var molecule = molecules[h];
		for (var i = 0; i < RHSs.length; i++) {
			// for now, assume that we don't have multiple rules with the same RHSs
			// which is true in my given input
			var position = 0;
			//debugger;
			while ((position = molecule.indexOf(RHSs[i], position))>= 0) {
				if (typeof molecule !== 'string') {
					debugger;
				}
				var before = molecule.substr(0, position);
				var to_replace = RHSs[i];
				var after = molecule.substr(position+to_replace.length);
				var replace_with = replacement_rules_right[to_replace][0];
				var input = before+replace_with+after;
				if (inputs.indexOf(input) < 0) inputs.push(input);
				position++;
			}
		}
	}
	return inputs;
}

function countAtoms(molecule) {
	debugger;
	var atoms = molecule.match(/([A-Ze][abcdf-z]*)/g);
	return atoms.length;
}

function produceMolecule(input, output) {
	var iterations = 0;
	while (true) {
		input = getAllReplacements(input);
		iterations++;
		if (input.indexOf(output) >= 0) {
			return iterations;
		}
		console.log(iterations, input.length, Math.max.apply(null,input.map(countAtoms)));
	}
}

function produceMoleculeFromRight(input, output) {
	var iterations = 0;
	while (true) {
		output = getAllPossibleInputs(output);
		iterations++;
		//console.log(output);
		console.log(iterations, output.length, Math.max.apply(null,output.map(countAtoms)));
		if (output.indexOf(input) >= 0) {
			return iterations;
		}
	}
}

function processLine(line) {
	var matches = line.match(/(\w+) => (\w+)/);
	// First look for replacement instructions
	if (matches && matches.length>0) {
		addRule(matches);
	} else if (line.length>0) {
		console.log("Trying to produce molecule: " + line);
		//otherwise perform a calibration
		var outputs = getAllReplacements([line]);
		console.log(outputs.length);
//		var iterations = produceMolecule('e', line);
//		console.log(iterations);
//		var inputs = getAllPossibleInputs([line]);
//		console.log (inputs);
//		inputs = getAllPossibleInputs(inputs);
//		console.log (inputs);
		console.log(produceMoleculeFromRight('e', [line]));
	}

}

function onClose() {
	//console.log(replacement_rules_left);
	//console.log(replacement_rules_right);
	console.log("Called getAllPossibleInputs(): " + getAllPossibleInputsTimesCalled);
}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input19a.txt'),
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);

// */

