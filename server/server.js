/*jslint node: true */

// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
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


// CORS Support
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

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

// app.get('/purchase/:id', function(req, res) {
//     db.all("SELECT * FROM Purchases WHERE id=" + req.params.id, function(err, rows) {
//         res.json(rows);
//     });
// });

// app.get('/purchase/:day', function(req, res) {
//     db.all("SELECT * FROM Purchases WHERE day='" + req.params.day + "'", function(err, rows) {
//         res.json(rows);
//     });
// });


app.post('/purchase', function(req, res) {
    var name = req.body.name;
    var store = req.body.store;
    var description = req.body.description;
    var price = req.body.price;
    var day = req.body.day;
    db.run("INSERT INTO Purchases VALUES (NULL, '" + name + "', '" + store + "', '" + description + "', '" + price + "', '" + day + "')", function(err) {
        if (err) {
            console.err(err);
            res.status(500);
        } else {
            res.status(202);
        }
        res.end();
    });
});

app.put('/purchase/:day', function(req, res) {
    var name = req.body.name;
    var store = req.body.store;
    var description = req.body.description;
    var price = req.body.price;
    var id = req.body.id;
    db.run("UPDATE Purchases SET name='" + name + "', store='" + store + "', description='" + description + "', price='" + price + "' WHERE id = " + id, function(err) {
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