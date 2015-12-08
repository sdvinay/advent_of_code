var md5 = require('md5');


function findLowestMatch(prefix) {
	for (var i = 0; true; i++) {
		var message = prefix + i.toString();
		var hash = md5(message);
		if (hash.indexOf('00000') === 0) {
			return i;
		}
	}
}

console.log(findLowestMatch('abcdef'));
console.log(findLowestMatch('pqrstuv'));
console.log(findLowestMatch('bgvyzdsv'));
