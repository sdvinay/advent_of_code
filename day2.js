function calcPaperNeeded(x, y, z) {
	var needed = 2 * (x*y + y*z + z*x);
	var extra = x*y*z/Math.max(x,y,z);
	return needed+extra;
}

function calcRibbonNeeded(x, y, z) {
	var perimeter = 2*(x+y+z-Math.max(x,y,z));
	var bow = x*y*z;
	return perimeter+bow;
}

var totalPaperNeeded = 0;
var totalRibbonNeeded = 0;

console.log(calcRibbonNeeded(2,3,4));
console.log(calcRibbonNeeded(1,1,10));

var rl = require('readline').createInterface({
	  input: require('fs').createReadStream('input/input2.txt')
  });

rl.on('line', function (line) {
	var dims = line.split("x").map(x=> parseInt(x));
	var paper = calcPaperNeeded(dims[0], dims[1], dims[2]);
	var ribbon = calcRibbonNeeded(dims[0], dims[1], dims[2]);
	totalPaperNeeded += paper;
	totalRibbonNeeded += ribbon;
  });

rl.on('close', function (line) {
	console.log(totalPaperNeeded);
	console.log(totalRibbonNeeded);
});

