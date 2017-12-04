// http://adventofcode.com/2017/day/3

// This can be computed rather than brute-forced:
// -- Note that each square has its size in the bottom-right corner (1, 9, 25, etc)
// -- So the first step is finding the size of the square this number is in
//    (e.g., the largest odd square smaller than the number)
// -- Note that orientation doesn't really matter.  Don't worry about up/left/right/down
//    Instead, the problem is just about adding two dimensions: 
//        One is based on how far this "ring" is from the center (half the side length)
//        Other is distance from the middle of the side

function computeDistance(num) {
	var ringDepth =  computeRingDepth(num);
	var ringSideLength = ringDepth+1;
	var stepsIntoRing = num - (ringDepth * ringDepth);
	var stepsFromCorner = stepsIntoRing % ringSideLength;
	var stepsFromCenterOfRing = Math.abs((ringSideLength/2) - stepsFromCorner);

	return stepsFromCenterOfRing;
}

function computeRingDepth(num) {
	if (num === 1) { return 0; }
	var largestSqrt = Math.floor(Math.sqrt(num-1));
	var oddSqrt = largestSqrt % 2 == 1 ? largestSqrt : largestSqrt - 1;
	return (oddSqrt+1)/2;
}

function test(num) {
	console.log(num, computeRingDepth(num), computeDistance(num));
}

input = 325489;

test(1);
test(2);
test(9);
test(12);
test(23);
test(25);
test(26);
test(1024);
test(input);


