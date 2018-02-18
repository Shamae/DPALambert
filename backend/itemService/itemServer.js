var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors');

const HOST_IP = process.env.HOST_IP;

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

//CORS configuration
app.use(cors());

// verify token
let options = {
    validationUri: 'http://localhost:5000/connect/introspect/',
    tokenParam: 'token',
    unprotected: ['/api/item']
    };
var bearerTokenValidation = require('./validation/bearerTokenValidation');
app.use(bearerTokenValidation(options));

// small logger
const logRequestStart = (req, res, next) => {
    console.info(`${req.method} ${req.originalUrl}`)
    next()
}
app.use(logRequestStart)

// to be able to read the body
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// route setup
var itemRouter = require('./routes/itemRoutes')(Item);
var protectedItemRouter = require('./routes/protectedItemRoutes')(Item);

// set routes
app.use('/api/item', itemRouter);
app.use('/api/saveitem', protectedItemRouter);

// default
app.get('/', function(req, res){
res.send('Welcome to the WorldMap Item API!');
});

// console output
app.listen(port, function(){
console.log('Running WorldMap Item API on port: ' + port);
});

module.exports = app;