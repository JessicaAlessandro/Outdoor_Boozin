// =============
// REQUIREMENTS
// =============
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    nodeDebugger = require('node-debugger'),
    morgan = require('morgan'),
    md5 = require('md5'),
    cookieParser = require('cookie-parser');

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
mongoose.connect('mongodb://localhost/finalproject', function(){
    console.log('connected to database!')
});

// =============
// MODELS
// =============


// =============
// LISTENER
// =============
app.listen(port);

// =============
// ROUTES
// =============