
function getSumOfDivisors(number) {
  var total1 = 0;
  var total2 = 0;
  const root = Math.floor(Math.sqrt(number));
  for (var i = 1; i <= root; i++) {
    if (number % i === 0) {
		total1 += i;
		if (number/i <= 50) {
			total2 += i;
		}
      if (Math.pow(i,2) !== number){
        total1 += (number / i);
		if (i <= 50) {
			total2 += (number / i);
		}
      }
    }
  }
  return [total1*10, total2*11];
}
console.log(getSumOfDivisors(1231)); // [1,1231]

for (var i = 0; true; i++) {
	var delivery = getSumOfDivisors(i);
	var bFound = false;
	if (bFound === false && (delivery[0] > 34000000)) {
		console.log(i);
		bFound = true;
	}
	if (delivery[1] > 34000000) {
		console.log(i);
		return;
	}
	
}
