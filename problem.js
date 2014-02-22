#!/usr/bin/env node
var settings = require('./problem.json');

process.stdin.on('readable', function(chunk) {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    ex(chunk.toString().replace(/\'/g, '"')); // correct for JSON
  }
});

if(settings.Mailgun){
  var Mailgun = require('mailgun').Mailgun;
  var mg = new Mailgun(settings.Mailgun); 
  var sendmail = function(f, t, s, b){
    console.log(arguments)
    mg.sendText(f, [t], s, b, {'X-Campaign-Id': '0'},
      function(err) { err && console.log(err) });
  }
}

if(settings.Nexmo){
  var nexmo = require('nexmoapi').Nexmo;
  var sms = new nexmo(settings.Nexmo.key, settings.Nexmo.secret);
  var sendsms = function(t, b){
    sms.send(settings.Nexmo.mynumber, t, b, console.log);
  }
}

function ex(msg){
	for(i in settings._){
	  if(msg.match(RegExp(i))){
	  	console.log('match', settings._[i]);
      var mail = {};
      mail.to = msg.match(RegExp(settings._[i].to))[1];
      mail.body = msg.match(RegExp(settings._[i].body))[1];
      console.log(settings._[i].action, mail.to, mail.body);
      if(settings._[i].action == 'SMS')
        sendsms(mail.to, mail.body);
      if(settings._[i].action == 'MAIL')
        sendmail(mail.from || 'admin', mail.to, mail.subject || 'Problem alert', mail.body);
    }
	}
}
