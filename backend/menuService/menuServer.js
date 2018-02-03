var express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose');

// database setup
var db;
if(process.env.ENV == 'Test'){
    // test DB
    db = mongoose.connect('mongodb://localhost/worldmapdb_test', { useMongoClient: true });
}
else{
    db = mongoose.connect('mongodb://localhost/worldmapdb', { useMongoClient: true });
};

// intialize models
var Category = require('./models/categoryModel');
// var FeatureType = require('./models/featureTypeModel');

// server setup
var app = express();
var port = process.env.port || 3000;

// route setup
var menuRouter = require('./routes/menuRoutes')(Category);

//CORS configuration
app.use(cors());

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

module.exports = app;