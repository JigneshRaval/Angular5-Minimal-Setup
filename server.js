const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
//const mongoose = require('mongoose');
//const url = 'mongodb://localhost/blogDb';
// Type 3: Persistent datastore with automatic loading
var Datastore = require('nedb')
	, db = {};

db.app1 = new Datastore({ filename: './src/data/users.db', autoload: true });
db.articles = new Datastore({ filename: './src/data/articles.db', autoload: true });

// const User = require('./model/user');

/*
// configure CORS
const corsOptions = {
	allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
	credentials: true,
	methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
	preflightContinue: false
};
app.use(cors(corsOptions))
*/

app.use(cors({
	preflightContinue: false
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* app.use(function (err, req, res, next) {
	// Do logging and user-friendly error message display
	console.error(err);
	res.status(500).send();
	next(err);
}) */

// API for APP 1
//================================
// User Login using Login form
app.post('/api/user/login', (req, res) => {
	console.log("POST Req:", req.body, req.body.username);
	db.app1.find({ username: req.body.username, password: req.body.password }).sort({ name: -1 }).exec(function (err, user) {
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
})

// Create new user using Signup form
app.post('/api/user/create', (req, res) => {

	var user = {
		name: req.body.name.split('@').pop[0],
		username: req.body.username,
		password: req.body.password,
		today: new Date()
	};

	db.app1.insert(user, function (err, newDoc) {
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

})

app.get('/api/user/login', (req, res, next) => {
	return res.status(200).json({
		status: 'You have successfully logged in.'
	});
});

// API for APP 2 [ Angular Examples ]
//================================

var routes = require('./routes/index');

app.use('/api', routes(db.articles));

/* app.post('/api/articles/create', (req, res) => {
	db.articles.insert(req.body, function (err, newDoc) {
		// Callback is optional
		// newDoc is the newly inserted document, including its _id
		// newDoc has no key called notToBeSaved since its value was undefined
		if (err) {
			return err;
		}
		return res.status(200).json({
			status: 'success',
			message: 'You have successfully created Article.',
			data: newDoc
		});
	});
});

app.get('/api/articles', (req, res) => {
	return res.status(200).json({
		status: 'All articles are listed successfully.'
	});
}); */

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb', function (err) {

   if (err) throw err;

   console.log('Successfully connected');

});

app.listen(3005, () => console.log(`Blog server running on port 3005!`))
