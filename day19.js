//* // literal/in-line test cases go here
// */

//*

var replacement_rules = {};

function processLine(line) {
	var matches = line.match(/(\w+) => (\w+)/);
	// First look for replacement instructions
	if (matches && matches.length>0) {
		if (matches[1] in replacement_rules) {
			replacement_rules[matches[1]].push(matches[2]);
		} else {
			replacement_rules[matches[1]] = [matches[2]];
		}
	} else if (line.length>0) {
		//otherwise perform a calibration
		var molecules = line.match(/([A-Z][a-z]*)/g);
		var outputs = [];
		for (var i = 0; i < molecules.length; i++) {
			if (molecules[i] in replacement_rules) {
				var replacements = replacement_rules[molecules[i]];
				var before = molecules.slice(0,i).join('');
				var after = molecules.slice(i+1).join('');
				for (var j = 0; j < replacements.length; j++) {
					var output = before + replacements[j] + after;
					if (outputs.indexOf(output) < 0) outputs.push(output);
				}
			}
		}
		console.log(outputs.length);
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

