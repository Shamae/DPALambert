var mongoose = require('mongoose');

// create model
var categoryModel = new mongoose.Schema({
    displayName: String
});

// export model
module.exports = mongoose.model('category', categoryModel, 'category');