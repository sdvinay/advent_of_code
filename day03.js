var fs = require('fs');

fs.readFile('input/input03.txt', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		day3(data, 1);
		day3(data, 2);
	});

function makePoint(x,y) {
	return x.toString() + "," + y.toString();
}

function day3(data, numSantas) {
		var x = [];
		var y = [];
		for (var i = 0; i < numSantas; i++) {
			x[i] = y[i] = 0;
		}
		var visited = new Set();
		visited.add(makePoint(0,0));

		for (var i = 0; i < data.length; i++) {
			var j = i % numSantas;
			if (data.charAt(i) == "^") {
				y[j] += 1;
			} else if (data.charAt(i) == "v") {
				y[j] -= 1;
			} else if (data.charAt(i) == "<") {
				x[j] -= 1;
			} else if (data.charAt(i) == ">") {
				x[j] += 1;
			}
			visited.add(makePoint(x[j],y[j]));
		}
		console.log("Visited homes:" + visited.size);
}

