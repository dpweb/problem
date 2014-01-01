module.exports = {
		email: function(t, f, s, b){
			var settings = require('./settings.json');
			var Mailgun = require('mailgun').Mailgun;
			var mg = new Mailgun(settings.mailgun);
			mg.sendText(f, [t], s, b, {'X-Campaign-Id': '0'},
	         function(err) { err && console.log(err) });
		},
		sms: function(t, b){
			var settings = require('./settings.json');
			var nexmo = require('nexmoapi').Nexmo;
			var sms = new nexmo(settings.nexmo.key, settings.nexmo.secret);
		    sms.send(settings.nexmo.mynumber, t, b, console.log);
		}
}
