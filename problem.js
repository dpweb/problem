#!/usr/bin/env node
var settings = require('./problem.json');

if(settings.Mailgun){
  var mailgun = require('Mailgun');
  var mg = new mailgun.Mailgun(settings.Mailgun.api_key);

  var sendmail = function(t, b, s){
    mg.sendText(settings.Mailgun.from, [t], settings.Mailgun.subject, b, {'X-Campaign-Id': 'something'},
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
      var arr = msg.split(';');
      (arr[0].match('@') ? sendmail:sendsms)(arr[0], arr[1]);
}

process.stdin.on('readable', function(chunk) {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    ex(chunk.toString().replace(/\'/g, '"')); // correct for JSON
  }
});
