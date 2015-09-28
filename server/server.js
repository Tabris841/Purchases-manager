
// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// Create the application.
var app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// MongoDB
mongoose.connect('mongodb://admin:admin@ds059672.mongolab.com:59672/purchasesdb');
mongoose.connection.once('open', function() {

    // Load models.
    app.models = require('./models/index');

    // Load the routes.
    var routes = require('./routes');
    _.each(routes, function(controller, route) {
        app.use(route, controller(app, route));
    });

    // Start server
    app.listen(9001);
    console.log('API listening on port 9001');
    console.log("Database running");
});

