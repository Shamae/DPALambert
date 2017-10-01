var mongoose = require('mongoose');

// create model
var featureTypeModel = new mongoose.Schema({
    displayName: String
});

// export model
module.exports = mongoose.model('featureType', featureTypeModel, 'featureType');