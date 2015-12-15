var ingr = [ [ 5, -1,  0,  0, 5],
			 [-1,  3,  0,  0, 1],
			 [ 0, -1,  4,  0, 6],
			 [-1,  0,  0,  2, 8] ];

var numProperties = 4;
function computeScore(ingrs, counts) {
	var totalScore = 1;
	for (var i = 0; i < numProperties; i++) {
		var sumProperty = 0;
		for (var j = 0; j < counts.length; j++) {
			sumProperty += counts[j]*ingr[j][i]
			
		}
		if (sumProperty < 0) { sumProperty = 0; }
		totalScore *= sumProperty;
	}
	return totalScore;
}

function computeCalories(ingrs, counts) {
	var calories = 0;
	for (var j = 0; j < counts.length; j++) {
		calories += counts[j]*ingr[j][4]
		
	}
	return calories;
}


var totalCookies = 100;
var highScore = 0;
for (var i = 0; i <= totalCookies; i++) {
	for (var j = 0; j <= totalCookies-i; j++) {
		for (var k = 0; k <= totalCookies - i - j; k++) {
			var remainTotal = totalCookies - i - j - k;
			counts = [i, j, k, remainTotal];
			if (computeCalories(ingr, counts) === 500) {
				var score = computeScore(ingr, counts);
				console.log(counts, score);
				if (score > highScore) { highScore = score; }
			}
		}
	}
}
console.log(highScore);
