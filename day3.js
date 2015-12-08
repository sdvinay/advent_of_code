var fs = require('fs');

fs.readFile('input/input3.txt', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		day3(data);
	});

function makePoint(x,y) {
	return x.toString() + "," + y.toString();
}

function day3(data) {
		var x = 0;
		var y = 0;
		var visited = new Set();
		visited.add(makePoint(x,y));

		for (var i = 0; i < data.length; i++) {
			if (data.charAt(i) == "^") {
				y += 1;
			} else if (data.charAt(i) == "v") {
				y -= 1;
			} else if (data.charAt(i) == "<") {
				x -= 1;
			} else if (data.charAt(i) == ">") {
				x += 1;
			}
			visited.add(makePoint(x,y));
		}
		console.log("Visited homes:" + visited.size);
}

