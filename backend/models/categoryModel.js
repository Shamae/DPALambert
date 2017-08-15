var mongoose = require('mongoose');

var categoryModel = new mongoose.Schema({
    displayName: [{
        type: String
    }]
});

module.exports = mongoose.model('category', categoryModel, "category");