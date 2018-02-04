var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    jwt = require('jsonwebtoken'),
    bearerTokenValidation = require('express-accesstoken-validation'),
    oidcJwksVerify = require('express-oidc-jwks-verify'),
    HOST_IP = process.env.HOST_IP;

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

// options for access token validation 
// set token issuer
//app.use(oidcJwksVerify({ issuer: `http://${HOST_IP}:5000` }));

// verify token
// app.get('/identity', (req, res) => {
//     const header = req.header('Authorization');
//     const token = header.replace(/Bearer /, '');
//     return res.status(200).send(jwt.decode(token));
//   });

// verify token
let options = {
    validationUri: 'http://${HOST_IP}:5000/connect/introspect',
    tokenParam: 'token'
    // unprotected: ['/public']
    };
app.use(bearerTokenValidation(options));

// to be able to read the body
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// route setup
var itemRouter = require('./routes/itemRoutes')(Item);

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