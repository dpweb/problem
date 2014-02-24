problem
=======

Send SMS or email based on piped in text from other programs.  Email or SMS number, semicolon, message.

Config - problem.json
````
{

  "Mailgun": {
    "from": "admin@example.com",
    "subject": "Alert!",
    "user": "",
    "password": ""
  },

  "Nexmo": {
     "mynumber": "",
	 "key": "",
	 "secret": ""
  } 

}
````

Test

````
$ echo "myemail@mydomain.com;Hi there" | problem.js
$ echo "18885551212;Hi there" | problem.js
````
or 
````
$ echo "Hi there" | problem.js myemail@mydomain.com
$ echo "Hi there" | problem.js 18885551212
````

Pipe from other programs
````
ls | problem.js myemail@mydomain.com
````
