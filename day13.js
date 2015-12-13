var Permutation = require('iterative-permutation');

var happiness = {};

var re = /(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)/;

var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input13.txt'),
	  output: process.stdout,
	  terminal: false
  });

function processLine(str) {
	var matches = str.match(re);
	var p1 = matches[1];
	var p2 = matches[4];
	var dir = matches[2];
	var magnitude = parseInt(matches[3]);
	var vector = (dir == "gain") ? magnitude : -magnitude;

	if (!(p1 in happiness)) {
		happiness[p1] = {};
	}
	happiness[p1][p2] = vector;
}

function findBestOrdering(happiness) {
	var people = Object.keys(happiness);
	var highestScore = scoreOrdering(people, happiness);
	var generator = new Permutation(people);
	while (generator.hasNext()) {
		var score = scoreOrdering(generator.next(), happiness);
		if (score > highestScore)
			highestScore = score;
	}
	
	return highestScore;
}

function scoreOrdering(ordering, happiness) {
	debugger;
	var score = 0;
	for (var i = 0; i < ordering.length; i++) {
		var prev = i === 0 ? ordering.length-1 : i-1
		var next = i === ordering.length-1 ? 0 : i+1
		score += happiness[ordering[i]][ordering[prev]];
		score += happiness[ordering[i]][ordering[next]];
	}
	return score;
}

rl.on('line', processLine);

rl.on('close', function () {
		console.log(happiness);
		console.log(findBestOrdering(happiness));
});

/*
processLine('Alice would gain 54 happiness units by sitting next to Bob.');
processLine('Alice would lose 79 happiness units by sitting next to Carol.');
processLine('Bob would lose 7 happiness units by sitting next to Carol.');
		console.log(happiness);
		*/

