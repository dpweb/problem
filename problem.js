#!/usr/bin/env node
var settings = require('./problem.json');

if(settings.Mailgun){
  var mailgun = require('Mailgun');
  var mg = new mailgun.Mailgun(settings.Mailgun.api_key);

  var sendmail = function(t, b, s){
    mg.sendText('admin@example.com', [t], 'Alert', b, {'X-Campaign-Id': 'something'},
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
      var msgt = {
         to: msg.match(RegExp(settings._[i].to))[1],
         body: msg.match(RegExp(settings._[i].body))[1]
      }

      console.log(settings._[i].action, msgt);
      if(settings._[i].action == 'MSG'){
         (msgt.to.match('@') ? sendmail:sendsms)(msgt.to, msgt.body);
      }

    }
	}
}

process.stdin.on('readable', function(chunk) {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    ex(chunk.toString().replace(/\'/g, '"')); // correct for JSON
  }
});
