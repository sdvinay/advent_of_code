var fs = require('fs');

fs.readFile('input/input1.txt', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		var curFloor = 0;
		var hitBasementYet = false;
		console.log(data);
		for (var i = 0; i < data.length; i++) {
			if (data.charAt(i) == "(") {
				curFloor++;
			} else if (data.charAt(i) == ")") {
				curFloor--;
			}
			if (curFloor < 0 && hitBasementYet === false) {
				console.log("First hit basement at: " + (i+1));
				hitBasementYet = true;
			}
		}
		console.log("Ending floor: " + curFloor);
});
