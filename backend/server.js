var express = require('express'),
    mongoose = require('mongoose');

// database setup
var db = mongoose.connect('mongodb://localhost/worldmapdb', { useMongoClient: true })
var Category = require('./models/categoryModel');

// server setup
var app = express();
var port = process.env.port || 3000;

// route setup
var menuRouter = express.Router();
menuRouter.route('/Menu')
    .get(function(req, res){
        Category.find(function(err, categories){
            if (err) 
                res.status(500).send(err);
            else
                res.json(categories);
        });
    });

app.use('/api', menuRouter);

app.get('/', function(req, res){
    res.send('Welcome to the WorldMap API!');
});

app.listen(port, function(){
    console.log('Running WorldMap API on port: ' + port);
});