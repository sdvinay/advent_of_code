function lookandsay(str) {
	var c = str[0];
	var counter = 0;
	var output = "";
	for (var i = 0; i < str.length; i++) {
		if (str[i] == c) {
			counter++;
		} else {
			output += counter;
			output += c;
			c = str[i];
			counter = 1;
		}
	}
	output += counter;
	output += c;
	return output;
}

function iterate(input, iters) {
	var str = input;
	for (var i = 0; i < iters; i++) {
		str = lookandsay(str);
		console.log(str.length);
	}
}

//iterate("1", 6);
iterate("1113122113", 50);
