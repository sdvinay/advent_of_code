function reallocateBlocks(banks) {
	var out = banks.slice();
	var max = Math.max(...banks);
	var toEmpty = banks.indexOf(max);
	out[toEmpty] = 0;
	for (var i = 1; i <= max; i++) {
		out[(toEmpty+i)%banks.length]++;
	}
	return out;
}

console.log(reallocateBlocks([0, 2, 7, 0])); // expect [2, 4, 1, 2]
console.log(reallocateBlocks([2, 4, 1, 2])); // expect [3, 1, 2, 3]
console.log(reallocateBlocks([3, 1, 2, 3])); // expect [0, 2, 3, 4]
console.log(reallocateBlocks([0, 2, 3, 4])); // expect [1, 3, 4, 1]
console.log(reallocateBlocks([1, 3, 4, 1])); // expect [2, 4, 1, 2]


function hashState(banks) {
	return banks.join('_');
}

function findCycle(banks) {
	var seenStates = {};
	var steps = 0;
	while (!seenStates[hashState(banks)]) {
		seenStates[hashState(banks)] = true;
		banks = reallocateBlocks(banks);
		steps++;
	}
	return steps;
}

console.log(findCycle([0, 2, 7, 0]));

console.log(findCycle([0, 5, 10, 0, 11, 14, 13, 4, 11, 8, 8, 7, 1, 4, 12, 11]));
