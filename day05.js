function isStringNicePart1(str) {
	return ((countVowels(str) >= 3) &&
			containsPair(str) &&
			containsNaughty(str) === false);
}

var rePart2_1 = /([a-z][a-z]).*\1/
var rePart2_2 = /([a-z]).\1/
function isStringNicePart2(str) {
	var matches1 = str.match(rePart2_1);
	var matches2 = str.match(rePart2_2);
	return (matches1 && matches1.length>0 && matches2 && matches2.length>0)===true;
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
console.log(testStrings.map(isStringNicePart1));
// */

//*
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input05.txt'),
	  output: process.stdout,
	  terminal: false
  });
var countNicePart1 = 0;
var countNicePart2 = 0;
rl.on('line', function(line) {
		if (isStringNicePart1(line)) {
			countNicePart1++;
		}
		if (isStringNicePart2(line)) {
			countNicePart2++;
		}
});

rl.on('close', function () {
		console.log(countNicePart1);
		console.log(countNicePart2);
});
// */

