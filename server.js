var express = require('express');
var app = express();
var mongojs = require('mongojs');
// data, collection
var db = mongojs('movielist', ['movielist']);
var bodyParser = require('body-parser');



// use this if you if Angular-part should be loaded from this Node project folder
//app.use(express.static(__dirname + "/public"));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*' /*'http://localhost:63342'*/);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// allow parsing from html-body
app.use(bodyParser.json());

app.get('/movielist', function(req, res){
	console.log("I received a GET request!")

	db.movielist.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	})

});


app.post('/movielist/create', function(req, res){
    console.log(req.body);

    db.movielist.insert(req.body, function(err, doc){
        res.json(doc);
    });
});

app.delete('/movielist/delete/:id', function(req, res){
    var id = req.params.id;
    console.log(id);

    db.movielist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

app.get('/movielist/find/:id', function(req, res){
    var id = req.params.id;
    console.log(id);

    db.movielist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
        res.json(doc);
    });
});

app.put('/movielist/update/:id', function(req, res){
    var id = req.params.id;
    console.log(id + " was found :-)");

    db.movielist.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {title: req.body.title, director: req.body.director, year: req.body.year, rating: req.body.rating}},
        new: true}, function(err, doc){
            res.json(doc);
        });
});


app.listen(3000);
console.log("Server is running on port 3000");