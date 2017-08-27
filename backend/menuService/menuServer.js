var express = require('express'),
    mongoose = require('mongoose');

// database setup
var db = mongoose.connect('mongodb://localhost/worldmapdb', { useMongoClient: true })
var Category = require('./models/categoryModel');
var FeatureType = require('./models/featureTypeModel');

// server setup
var app = express();
var port = process.env.port || 3000;

// route setup
var menuRouter = require('./routes/menuRoutes')(Category);

//CORS configuration
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// set routes
app.use('/api/menu', menuRouter);

// default
app.get('/', function(req, res){
    res.send('Welcome to the WorldMap API!');
});

// console output
app.listen(port, function(){
    console.log('Running WorldMap API on port: ' + port);
});