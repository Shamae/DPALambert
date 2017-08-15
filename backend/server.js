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
var categoryRouter = express.Router();
categoryRouter.route('/Category')
    .get(function(req, res){
        Category.find(function(err, categories){
            if (err) 
                res.status(500).send(err);
            else
                res.json(categories);
        });
    });
var featureTypeRouter = express.Router();
featureTypeRouter.route('/FeatureType')
    .get(function(req, res){
        FeatureType.find(function(err, featureTypes){
            if (err) 
                res.status(500).send(err);
            else
                res.json(featureTypes);
        });
    });
var menuRouter = express.Router();
menuRouter.route('/Menu')
    .get(function(req, res){
        Category.aggregate([
            {
                $lookup: {
                    from: 'featureType',
                    localField: '_id',
                    foreignField: 'categoryId',
                    as: 'submenu'
                },
            },
            {
                $project: { 
                    _id: 0,
                    'submenu._id' : 0,
                    'submenu.categoryId': 0,
                    'submenu.geometryType': 0
                }
            }
        ], function(err, menu){
            if (err) 
                res.status(500).send(err);
            else
                res.json(menu);
        });
    });

// set routes
app.use('/api', menuRouter);
app.use('/api', categoryRouter);
app.use('/api', featureTypeRouter);

// default
app.get('/', function(req, res){
    res.send('Welcome to the WorldMap API!');
});

app.listen(port, function(){
    console.log('Running WorldMap API on port: ' + port);
});