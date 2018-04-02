const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

//const mongoose = require('mongoose');
//const url = 'mongodb://localhost/blogDb';
// Type 3: Persistent datastore with automatic loading
var Datastore = require('nedb')
	, db = new Datastore({ filename: './src/data/users.db', autoload: true });

// const User = require('./model/user');
// configure CORS
const corsOptions = {
	allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
	credentials: true,
	methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
	preflightContinue: false
};

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* app.use(function (err, req, res, next) {
	// Do logging and user-friendly error message display
	console.error(err);
	res.status(500).send();
	next(err);
}) */

app.get('/api/user/login', (req, res, next) => {
	db.find({ username: req.body.username, password: req.body.password }).sort({ name: -1 }).exec(function (err, user) {
		if (err) {
			return err;
		}
		console.log("GET :", user, user.length);
		if (user.length === 1) {
			return res.status(200).json({
				status: 'success',
				data: user
			})
		} else {
			return res.status(200).json({
				status: 'fail',
				message: 'Login Failed'
			})
		}
	});
});

app.post('/api/user/login', (req, res) => {

	db.find({ username: req.body.username, password: req.body.password }).sort({ name: -1 }).exec(function (err, user) {
		if (err) {
			return err;
		}
		console.log("POST :", user, user.length);
		if (user.length === 1) {
			return res.status(200).json({
				status: 'success',
				data: user
			})
		} else {
			return res.status(200).json({
				status: 'fail',
				message: 'Login Failed'
			})
		}
	});

	/* mongoose.connect(url, { useMongoClient: true }, function (err) {
		if (err) throw err;
		User.find({
			username: req.body.username, password: req.body.password
		}, function (err, user) {
			if (err) throw err;
			if (user.length === 1) {
				return res.status(200).json({
					status: 'success',
					data: user
				})
			} else {
				return res.status(200).json({
					status: 'fail',
					message: 'Login Failed'
				})
			}

		})
	}); */
})

app.post('/api/user/create', (req, res) => {

	var user = {
		name: req.body.name.split('@').pop[0],
		username: req.body.username,
		password: req.body.password,
		today: new Date()
	};

	db.insert(user, function (err, newDoc) {
		// Callback is optional
		// newDoc is the newly inserted document, including its _id
		// newDoc has no key called notToBeSaved since its value was undefined
		if (err) {
			return err;
		}
		return res.status(200).json({
			status: 'success',
			data: newDoc
		});
	});


	/* mongoose.connect(url, function (err) {
		if (err) throw err;
		const user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		})
		user.save((err, res) => {
			if (err) throw err;
			return res.status(200).json({
				status: 'success',
				data: res
			})
		})
	}); */
})

app.listen(3005, () => console.log(`Blog server running on port 3005!`))
