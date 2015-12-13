var md5 = require('md5');


function findLowestMatch(prefix, match) {
	for (var i = 0; true; i++) {
		var message = prefix + i.toString();
		var hash = md5(message);
		if (hash.indexOf(match) === 0) {
			return i;
		}
	}
}

console.log(findLowestMatch('abcdef', '00000'));
console.log(findLowestMatch('pqrstuv', '00000'));
console.log(findLowestMatch('bgvyzdsv', '00000'));
console.log(findLowestMatch('bgvyzdsv', '000000'));
