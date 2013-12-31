module.exports = function(f){
	var ret = f();
	if(!ret) return;
	console.log('problem alert', ret);
	var Mailgun = require('mailgun').Mailgun;
	var settings = require('./settings.json');
	var mg = new Mailgun(settings.mailgun);
	mg.sendText('sender@example.com',
	         [settings.email],
	         ret,
	         {'X-Campaign-Id': 'something'},
	         function(err) { err && console.log(err) });
}
