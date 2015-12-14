var endingTime = 2503;
var re = /can fly (\d+) .* for (\d+) seconds, but then must rest for (\d+) seconds/;

var reindeers = [];
// match the instruction by regexp, and create the corresponding rule
function processLine(str) {
	var matches = str.match(re);
	if (matches) {
		var reindeer = { speed: parseInt(matches[1]), duration: parseInt(matches[2]), 
			rest: parseInt(matches[3]), points: 0}; 
		reindeers.push(reindeer);
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
		for (var i = 1; i <= endingTime; i++) {
			var leadingScore = 0;
			var leadingReindeer = [];
			for (var j = 0; j < reindeers.length; j++) {
				var score = countProgress(reindeers[j].speed, reindeers[j].duration, reindeers[j].rest, i);
				if (score > leadingScore) {
					leadingReindeer = [j];
					leadingScore = score;
				} else if (score == leadingScore) {
					leadingReindeer.push(j);
				}
				if (i === endingTime) {
					console.log(score);
				}
			}
			for (var k = 0; k < leadingReindeer.length; k++) {
				reindeers[leadingReindeer[k]].points++;
			}
		}
		for (var j = 0; j < reindeers.length; j++) {
			console.log(reindeers[j].points);
		}
});
// */

/*
// */
