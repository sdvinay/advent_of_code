var endingTime = 2503;
var re = /can fly (\d+) .* for (\d+) seconds, but then must rest for (\d+) seconds/;
// match the instruction by regexp, and create the corresponding rule
function processLine(str) {
	var matches = str.match(re);
	if (matches) {
		console.log(countProgress(parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]), endingTime));
		return;
	}
	throw new Error('line didnt match pattern: '+str);
}

function countProgress(speed, duration, rest, iterations) {
	debugger;
	var cycleLength = duration+rest;
	var fullCylces = Math.floor(iterations/cycleLength);
	var progress = fullCylces * (speed*duration);
	var remainder = iterations % cycleLength;
	progress += (remainder > duration ? duration : remainder)*speed;
	return progress;

}

//*
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input14.txt'),
	  output: process.stdout,
	  terminal: false
  });

rl.on('line', processLine);

rl.on('close', function () {
});
// */

/*
// */
