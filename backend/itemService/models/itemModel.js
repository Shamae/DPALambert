var mongoose = require('mongoose');

// create model
// TODO create model
var itemModel = new mongoose.Schema({
    displayName: [{
        type: String
    }]
});

// export model
module.exports = mongoose.model('item', itemModel, 'item');