function getNextCode(prev) {
	return ((prev * 252533) % 33554393);
}

console.log(getNextCode(20151125));

function getSequenceFromPos(row,col) {
	var seq = 1
	for (var i = 1; i < row; i++) {
		seq += i;
	}
	for (var i = 1; i < col; i++) {
		seq += (row+i);
	}
	return seq;

}

for (var row = 1; row<=6; row++) {
	var output = [];
	for (var col = 1; col<=6; col++) {
		output.push(getSequenceFromPos(row,col));
	}
	console.log(output);
}

var outputSequence =getSequenceFromPos(3010, 3019);
console.log(outputSequence);

var curCode = 20151125;
for (var i = 1; i < outputSequence; i++) {
	curCode = getNextCode(curCode);
}

console.log(curCode);
