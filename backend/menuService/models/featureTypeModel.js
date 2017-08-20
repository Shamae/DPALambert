var mongoose = require('mongoose');

// create model
var featureTypeModel = new mongoose.Schema({
    displayName: [{
        type: String
    }]
});

// export model
module.exports = mongoose.model('featureType', featureTypeModel, 'featureType');