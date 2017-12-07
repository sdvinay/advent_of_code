var Problem = Object.freeze({ 
	part1 : 1,
	part2 : 2
});

//* // literal/in-line test cases go here
// */

console.log(execMaze([0, 3, 0, 1, -3], Problem.part1)); // expect 5
console.log(execMaze([0, 3, 0, 1, -3], Problem.part2));  // expect 10

//*


function execMaze(maze, problemPart) {
	var steps = 0;
	var index = 0;
	var mazeSize = maze.length;

	while (index >= 0 && index < mazeSize) {
		steps++;
		var offset = maze[index];
		var adjustment = (problemPart === Problem.part2 && offset >= 3) ? -1 : +1;
		maze[index] += adjustment;
		index += offset;
	}
	
	return steps;
}

// Two copies of the maze, for Part 1 and Part 2
var maze1 = [];
var maze2 = [];

function processLine(line) {
	maze1.push(parseInt(line));
	maze2.push(parseInt(line));
}

function onClose() {
	console.log(execMaze(maze1, Problem.part1));
	console.log(execMaze(maze2, Problem.part2));
}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input2017_05.txt'),
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);

// */

