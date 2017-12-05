//* // literal/in-line test cases go here
// */

console.log(execMaze([0, 3, 0, 1, -3]));

//*

function execMaze(maze) {
	var steps = 0;
	var index = 0;
	var mazeSize = maze.length;

	while (index >= 0 && index < mazeSize) {
		steps++;
		var offset = maze[index];
		maze[index]++;
		index += offset;
	}
	
	return steps;
}

var maze = [];

function processLine(line) {
	maze.push(parseInt(line));
}

function onClose() {
	console.log(execMaze(maze));
}
var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input2017_05.txt'),
	  output: process.stdout,
	  terminal: false
  });
rl.on('line', processLine);
rl.on('close', onClose);

// */

