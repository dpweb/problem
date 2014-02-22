problem
=======

Send SMS or email based on piped in text from other programs.

Config - problem.json
````
{

  "_": {
     "^mail": {
        "to": "^mail\:([^\s]*)",
        "body": "body\:(.*)" 
     }
  },

  "Mailgun": {
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
