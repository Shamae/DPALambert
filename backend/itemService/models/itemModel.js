'use strict';

var mongoose = require('mongoose');

// create model
var itemModel = new mongoose.Schema({
    type: String,
    geometry: {
        type: {
            type: String,
            required: true,
            enum: ['Point', 'LineString', 'Polygon'],
            default: 'Point'
        },
        coordinates: {
            type: Array
        }
    },
    properties:{
        featureTypeId: Number,
        displayName: String,
        description: String,
        owner: String,
        visibility: String,
        zoomlevel: Number,
        timestamp: Date
    }
});

// export model
module.exports = mongoose.model('item', itemModel, 'item');