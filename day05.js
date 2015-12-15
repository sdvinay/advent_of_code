function isStringNice(str) {
	return ((countVowels(str) >= 3) &&
			containsPair(str) &&
			containsNaughty(str) === false);
}

function countVowels(str) {
	var vowelCount = 0;
	for (var i = 0; i < str.length; i++) {
		switch(str[i]) {
			case 'a':
			case 'e':
			case 'i':
			case 'o':
			case 'u':
				vowelCount++;
				break;
		}
	}
	return vowelCount;
}

function containsPair(str) {
	for (var i = 0; i < str.length-1; i++) {
		if (str[i] === str[i+1])
			return true;
	}
	return false;
}

var reNaughty = /ab|cd|pq|xy/;
function containsNaughty(str) {
	var matches = str.match(reNaughty);
	return (matches && matches.length>0)===true;
}

//*
var testStrings = ['ugknbfddgicrmopn', 'jchzalrnumimnmhp', 'haegwjzuvuyypxyu', 'dvszwmarrgswjxmb'];

console.log(testStrings.map(countVowels));
console.log(testStrings.map(containsPair));
console.log(testStrings.map(containsNaughty));
console.log(testStrings.map(isStringNice));
// */

//*
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input05.txt'),
	  output: process.stdout,
	  terminal: false
  });
var countNice = 0;
rl.on('line', function(line) {
		if (isStringNice(line)) {
			countNice++;
		}
});

rl.on('close', function () {
		console.log(countNice);
});
// */

