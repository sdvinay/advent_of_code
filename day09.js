var Permutation = require('iterative-permutation');

var distances = {};

var re = /(\w+) to (\w+) = (\d+)/;


function processLine(str) {
	var matches = str.match(re);
	var c1 = matches[1];
	var c2 = matches[2];
	var dist = parseInt(matches[3]);

	if (!(c1 in distances)) {
		distances[c1] = {};
	}
	if (!(c2 in distances)) {
		distances[c2] = {};
	}
	distances[c1][c2] = dist;
	distances[c2][c1] = dist;
}

function findBestOrdering(distances) {
	var cities = Object.keys(distances);
	var lowestScore = scoreOrdering(cities, distances);
	var highestScore = scoreOrdering(cities, distances);
	var generator = new Permutation(cities);
	while (generator.hasNext()) {
		var score = scoreOrdering(generator.next(), distances);
		if (score < lowestScore)
			lowestScore = score;
		if (score > highestScore)
			highestScore = score;
	}
	
	return [lowestScore, highestScore];
}

function scoreOrdering(ordering, distances) {
	var score = 0;
	for (var i = 0; i < ordering.length-1; i++) {
		score += distances[ordering[i]][ordering[i+1]];
	}
	return score;
}

//*
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input09.txt'),
	  output: process.stdout,
	  terminal: false
  });

rl.on('line', processLine);

rl.on('close', function () {
		console.log(distances);
		console.log(findBestOrdering(distances));

});
// */

/*
processLine('London to Dublin = 464');
processLine('London to Belfast = 518');
processLine('Dublin to Belfast = 141');
		console.log(distances);
		console.log(findBestOrdering(distances));
// */
