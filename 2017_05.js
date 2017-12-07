// http://adventofcode.com/2017/day/5

// This program solves both parts 1 and 2 of this puzzle, as they are largely
// the same.  Note the use of the Puzzle type as input to some functions to vary
// the behavior to solve for part 1 vs. part 2 (the output of this program is the
// solutions for the test case and the real input, for each part of the puzzle).

// This puzzle, by its nature, is about mutating state (each operation literally
// mutates its surroundings).  It would be possible to solve in a functional manner,
// but solving via mutating state is very straight forward and natural.  The
// execMaze() function does the heavy lifting here.  Because execMaze modifies its
// input, we create two copies of the puzzle input as we read it in, to pass one to
// each invocation of execMaze.

// Puzzle is an enumerated type to enable variation in behavior between parts 1 and 2
var Puzzle = Object.freeze({ 
	part1 : 1,
	part2 : 2
});

//* // test cases
console.log(execMaze([0, 3, 0, 1, -3], Puzzle.part1)); // expect 5
console.log(execMaze([0, 3, 0, 1, -3], Puzzle.part2)); // expect 10
// */


// This function does the real work of executing the maze
// The logic is basically the same for both parts 1 and 2; the only difference is that
// in part two, it may decrement instead of increment, which is implemented in the
// instantion of the 'adjustment' variable
function execMaze(maze, puzzlePart) {
	var steps = 0;
	var index = 0;

	while (index >= 0 && index < maze.length) {
		steps++;
		var offset = maze[index];
		var adjustment = (puzzlePart === Puzzle.part2 && offset >= 3) ? -1 : +1;
		maze[index] += adjustment;
		index += offset;
	}
	return steps;
}

// Two copies of the input maze, for parts 1 and 2 (since executing the maze mutates it)
var maze1 = [];
var maze2 = [];

function processLine(line) {
	maze1.push(parseInt(line));
	maze2.push(parseInt(line));
}

function onClose() {
	console.log(execMaze(maze1, Puzzle.part1));
	console.log(execMaze(maze2, Puzzle.part2));
}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input2017_05.txt'),
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);


