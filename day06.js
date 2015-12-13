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

function processLine(str) {
	var matches = str.match(re);
	var x0 = parseInt(matches[2]);
	var y0 = parseInt(matches[3]);
	var x1 = parseInt(matches[4]);
	var y1 = parseInt(matches[5]);
	var action;
	if (matches[1].indexOf('toggle') !== -1) { action = TOGGLE;}
	if (matches[1].indexOf('off') !== -1) { action = TURNOFF;}
	if (matches[1].indexOf('on') !== -1) { action = TURNON;}

	enactAction(action, x0, y0, x1, y1);
	return([action, x0, y0, x1, y1]);
}

function enactAction(action, x0, y0, x1, y1) {
	for (var i = x0; i <= x1; i++) {
		for (var j = y0; j <= y1; j++) {
			switch(action) {
				/* this is for part 1
				case TURNOFF: bulbs[i][j] = 0; break;
				case TURNON:  bulbs[i][j] = 1 ; break;
				case TOGGLE : 
					bulbs[i][j] = (bulbs[i][j]>0 ? 0 : 1);
					break;
				//	*/
				//* this is for part 2
				case TURNOFF:
					bulbs[i][j] = (bulbs[i][j]>0 ? bulbs[i][j]-1 : 0);
					break;
				case TURNON:  bulbs[i][j] += 1 ; break;
				case TOGGLE : bulbs[i][j] += 2 ; break;
				// */
			}			
		}
	}
}

function countBrightness(bulbs) {
	var brightness = 0;
	for (var i = 0; i < SIZE; i++) {
		for (var j = 0; j < SIZE; j++) {
			brightness += bulbs[i][j];
		}
	}
	return brightness;
}

rl.on('line', function (line) {
		processLine(line);
  });

rl.on('close', function () {
		console.log(countBrightness(bulbs));
});

/*
console.log(processLine('toggle 537,781 through 687,941'));
console.log(processLine('turn on 226,196 through 599,390'));
console.log(processLine('turn off 199,133 through 461,193'));
*/

