// =============
// REQUIREMENTS
// =============
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    nodeDebugger = require('node-debugger'),
    morgan = require('morgan'),
    md5 = require('md5'),
    cookieParser = require('cookie-parser'),
    dotenv = require('dotenv').load(),
    Yelp = require('yelp');

var port = process.env.PORT || 3000;
var app = express();

// =============
// MIDDLEWARE
// =============
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(morgan('dev'));

app.use(cookieParser());

// =============
// DATABASE
// =============
// mongoose.connect('mongodb://localhost/finalproject', function(){
//     console.log('connected to database!')
// });

var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/outdoorboozin';
mongoose.connect(mongoUri);
// =============
// YELP
// =============

var yelp = new Yelp({
  consumer_key: process.env.YELP_Consumer_Key,
  consumer_secret: process.env.Consumer_Secret,
  token: process.env.Token,
  token_secret: process.env.Token_Secret,
});

app.get('/test', function(req, res) {

    yelp.search({ term: 'food', location: '11226', limit: 10, "Outdoor Seating": "true" })
    .then(function (data) {
      console.log(data);
      res.send(data);
    })
    .catch(function (err) {
      console.error(err);
    });

})

// =============
// MODELS
// =============
var Place = require('./models/place');

// =============
// LISTENER
// =============
app.listen(port);

// =============
// ROUTES
// =============

// Get request for all places. 
app.get('/', function(req, res) {

	Place.find().then(function(places) {
		console.log(places);
		res.send(places);
		req.onload(places)
	}); //end of query
}); //end of get request
