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
	return 0;
}

function test(num) {
	console.log(num, computeDistance(num));
}

input = 325489;

test(1);
test(12);
test(23);
test(1024);
test(input);


