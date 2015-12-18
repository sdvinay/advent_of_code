var containers = [43, 3, 4, 10, 21, 44, 4, 6, 47, 41, 34, 17, 17, 44, 36, 31, 46, 9, 27, 38]


function findCombos(remaining, used, amountRemaining) {
//	console.log(remaining, used, amountRemaining);
	if (amountRemaining === 0) {
		return [used];
	}
	if (amountRemaining < 0 || remaining.length === 0) {
		return [];
	}
	var copy = remaining.slice(0);
	var popped = copy.pop();
	return (findCombos(copy, used.concat(popped), amountRemaining-popped).concat(
			findCombos(copy, used, amountRemaining)));
}

//var combos = findCombos([20, 15, 10, 5, 5], [], 25);

var combos = findCombos(containers, [], 150);
console.log(combos);
console.log(combos.length);
var smallest = Math.min.apply(null, combos.map(function(x) {return x.length}));
console.log(smallest);
console.log(combos.filter(function(x) { return x.length === smallest; }).length);

