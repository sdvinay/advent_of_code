var SIZE = 1000;

var bulbs = [];
for (var i = 0; i < SIZE; i++) {
	bulbs[i] = [];
	for (var j = 0; j < SIZE; j++) {
		bulbs[i][j] = false;
	}
}

var re = /(\D+)(\d+),(\d+) through (\d+),(\d+)/;

var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input6.txt')
  });

var TOGGLE = -1;
var TURNOFF = 0;
var TURNON =  1;
function parseLine(str) {
	var matches = str.match(re);
	var x0 = parseInt(matches[2]);
	var y0 = parseInt(matches[3]);
	var x1 = parseInt(matches[4]);
	var y1 = parseInt(matches[5]);
	var action;
	if (matches[1].indexOf('toggle') !== -1) { action = TOGGLE;}
	if (matches[1].indexOf('off') !== -1) { action = TURNOFF;}
	if (matches[1].indexOf('on') !== -1) { action = TURNON;}

	processLine(action, x0, y0, x1, y1);
	return([action, x0, y0, x1, y1]);
}

function processLine(action, x0, y0, x1, y1) {
	for (var i = x0; i <= x1; i++) {
		for (var j = y0; j <= y1; j++) {
			switch(action) {
				case TURNOFF: bulbs[i][j] = false; break;
				case TURNON:  bulbs[i][j] = true ; break;
				case TOGGLE : bulbs[i][j] = !bulbs[i][j]; break;
			}			
		}
	}
}

rl.on('line', function (line) {
		parseLine(line);
  });

rl.on('close', function (line) {
		var bulbsOn = 0;
		for (var i = 0; i < SIZE; i++) {
			for (var j = 0; j < SIZE; j++) {
				if (bulbs[i][j]) { bulbsOn++; }
			}
		}
		console.log(bulbsOn);
});

console.log(parseLine('toggle 537,781 through 687,941'));
console.log(parseLine('turn on 226,196 through 599,390'));
console.log(parseLine('turn off 199,133 through 461,193'));

