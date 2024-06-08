const url = require('url');
const Database = require('@replit/database');
const express = require('express');
const app = express();
const db = new Database();
app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', '*');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	res.set('Access-Control-Expose-Headers', '*');
	next();
});

app.get('/', (req, res) => {
	res.send('Server');
});

// Check whether the users pass and username our correct

app.get('/api/logins/check', (req, res) => {
	var q = url.parse(req.url, true);
	var urlquest = q.query;

	var usersNameOnWeb = urlquest.user;
	var usersPassword = urlquest.pass;

	db.get('users').then(value => {

                if (value == "" || value == null) {
                   value = "User123||pass||"
                }

		var userData = value.split('||');

		for (var i = 0; i < userData.length; i++) {
			if (userData[i] == usersNameOnWeb) {
				if (usersPassword == userData[i + 1]) {
					res.json('Success');
					return res.end();
				} else {
					res.json('Access denied!');
					return res.end();
				}
			}
		}

		res.json('Access denied');
		return res.end();
	});
});

// Add a user when this url is put in

app.get('/api/logins/add', (req, res) => {
	var q = url.parse(req.url, true);
	var urlquest = q.query;

	var usersNameOnWeb = urlquest.user;
	var usersPassword = urlquest.pass;

	if (usersNameOnWeb == null || usersPassword == null) {
		res.json('Denied');
		return res.end();
	}

	if (usersNameOnWeb.includes('|', 0)) {
		res.json('Denied');
		return res.end();
	}

	console.log('request recieved');

	db.get('users').then(value => {

                if (value == "" || value == null) {
                   value = "User123||pass||"
                }
		var userData = value.split('||');

		for (var i = 0; i < userData.length; i += 3) {
			if (userData[i] == usersNameOnWeb) {
				console.log('username found');

				res.json('Denied');
				return res.end();
			}
		}

		// Add the user

		res.json('Welcome!');
		res.end();

		var combinedText = '';

		db.get('users').then(value => {
			combinedText = value;

			combinedText =
				combinedText +
				usersNameOnWeb +
				'||' +
				usersPassword +
				'||' +
				'default||';

			db.set('users', combinedText).then(() => {});
		});
	});
});
const portOfServer = process.env.port || 80;
app.listen(portOfServer, () =>
	console.log(`listening on port ${portOfServer}...`)
);