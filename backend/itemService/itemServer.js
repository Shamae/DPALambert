var express = require('express'),
mongoose = require('mongoose');

// database setup
var db;
if(process.env.ENV == 'Test'){
    // test DB
    db = mongoose.connect('mongodb://localhost/worldmapitemdb_test', { useMongoClient: true });
}
else{
    db = mongoose.connect('mongodb://localhost/worldmapitemdb', { useMongoClient: true });
};

// intialize models
var Item = require('./models/itemModel');

// server setup
var app = express();
var port = process.env.port || 3001;

// route setup
var itemRouter = require('./routes/itemRoutes')(Item);

//CORS configuration
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// set routes
app.use('/api/item', itemRouter);

// default
app.get('/', function(req, res){
res.send('Welcome to the WorldMap Item API!');
});

// console output
app.listen(port, function(){
console.log('Running WorldMap Item API on port: ' + port);
});

module.exports = app;