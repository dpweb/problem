problem
=======

Simply tests for a condition, and if true, sends an email alert using Mailgun.

settings.json
````
{
	"mailgun": "key...",
	"email": "me@admin.com"
}
````

test.js
````
var problem = require('./problem.js'), 
	g;

function testg(){
	return !g ? "this is an alert" : null;
}

// alert
problem(testg);
g = 1;

// no alert
problem(testg);
````