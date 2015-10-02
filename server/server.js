// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/days.sqlite3');


// Create the application.
var app = express();

// Middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
// app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// // MongoDB
// mongoose.connect('mongodb://admin:1234@ds051923.mongolab.com:51923/purchases');
// mongoose.connection.once('open', function() {

//     // Load models.
//     app.models = require('./models/index');

//     // Load the routes.
//     var routes = require('./routes');
//     _.each(routes, function(controller, route) {
//         app.use(route, controller(app, route));
//     });

//     // Start server
//     app.listen(9001);
//     console.log('API listening on port 9001');
//     console.log("Database running");
// });


app.get('/data', function(req, res) {
    db.all("SELECT * FROM Days", function(err, rows) {
        res.json(rows);
    });
});

app.get('/purchase', function(req, res) {
    db.all("SELECT * FROM Purchases", function(err, rows) {
        res.json(rows);
    });
});

app.get('/purchase/:day', function(req, res) {
    db.all("SELECT * FROM Purchases WHERE day='" + req.params.day + "'", function(err, rows) {
        res.json(rows);
    });
});


app.post('/purchase', function(req, res) {
    var name = req.body.name;
    var store = req.body.store;
    var description = req.body.description;
    var price = req.body.price;
    var day = req.body.day;
    db.run("INSERT INTO Purchases VALUES (NULL, '" + name + "', '" + store + "', '" + description + "', '" + price + "', '" + day + "')", function(err, row) {
        if (err) {
            console.err(err);
            res.status(500);
        } else {
            res.status(202);
        }
        res.end();
    });
});

app.put('/purchase', function(req, res) {
    var name = req.body.name;
    var store = req.body.store;
    var description = req.body.description;
    var price = req.body.price;
    var id = req.body.id;
    db.run("UPDATE Purchases SET name='" + name + "', store='" + store + "', description='" + description + "', price='" + price + "' WHERE id = " + id, function(err, row) {
        if (err) {
            console.err(err);
            res.status(500);
        } else {
            res.status(202);
        }
        res.end();
    });
});

app.delete('/purchase/:id', function(req, res) {
    console.log(req.params);
    var id = req.params.id;
    db.run("DELETE FROM Purchases WHERE id = " + id, function(err) {
        if (err) {
            console.err(err);
            res.status(500);
        } else {
            res.status(202);
        }
        res.end();
    });
});

app.listen(9001);
console.log('API listening on port 9001');
console.log("Database running");