var SIZE = 1000;

var bulbs = [];
for (var i = 0; i < SIZE; i++) {
	bulbs[i] = [];
	for (var j = 0; j < SIZE; j++) {
		bulbs[i][j] = 0;
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
				case TURNOFF: bulbs[i][j] = 0; break;
				case TURNON:  bulbs[i][j] = 1 ; break;
				case TOGGLE : 
					if (bulbs[i][j] > 0) {
						bulbs[i][j] = 0;
					} else {
						bulbs[i][j] = 1;
					}
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
				bulbsOn += bulbs[i][j];
			}
		}
		console.log(bulbsOn);
});

console.log(parseLine('toggle 537,781 through 687,941'));
console.log(parseLine('turn on 226,196 through 599,390'));
console.log(parseLine('turn off 199,133 through 461,193'));

