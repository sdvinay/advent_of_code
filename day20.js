
function getSumOfDivisors(number) {
  var total = 0;
  const root = Math.floor(Math.sqrt(number));
  for (var i = 1; i <= root; i++) {
    if (number % i === 0) {
		total += i;
      if (Math.pow(i,2) !== number){
        total += (number / i);
      }
    }
  }
  return total;
}
console.log(getSumOfDivisors(1231)); // [1,1231]

for (var i = 0; true; i++) {
	var delivery = getSumOfDivisors(i)*10;
	if (delivery > 34000000) {
		console.log(i);
		return;
	}
	
}
