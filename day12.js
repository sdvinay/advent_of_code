var fs = require('fs');

function sumNumbers(obj)  {
	if (typeof obj === 'string')
		return 0;
	if (typeof obj === 'number')
		return obj;
	if (Array.isArray(obj)) {
		if (obj.length === 1)
			return sumNumbers(obj[0]);
		return obj.map(sumNumbers).reduce(function(a,b) { return a+b}, 0);
	}
	if (typeof obj === 'object' && obj !== null) {
		var sum = 0;
		for(var key in obj) {
			if(obj[key] === 'red') // this part is added for day 2
				return 0;
			sum += sumNumbers(obj[key]);
		}
		return sum;
	}
	return 0;
}

console.log(sumNumbers(3));
console.log(sumNumbers([1,2,3]));
console.log(sumNumbers({"a":2,"b":4}));
console.log(sumNumbers([[[3]]] ));
console.log(sumNumbers({"a":{"b":4},"c":-1}));

fs.readFile('input/input12.json', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		//console.log((data));
		debugger;
		console.log(sumNumbers(JSON.parse(data)));
		});

