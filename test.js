var problem = require('./problem.js');

var g;

function testg(){
	return !g ? "this is an alert" : null;
}

// alert
problem(testg);
g = 1;

// no alert
problem(testg);