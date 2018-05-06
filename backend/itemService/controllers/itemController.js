'use strict';

var itemController = function(Item){
    // get function
    var get = function(req, res){
        // initialize query
        var query = {};
        if (req.query){
            query = req.query;
        };

        // query items
        Item.find(query, function(err, items){
            if (err){ 
                res.status(500);
                res.send(err);
            }
            else {
                res.status(200);
                res.json(items);
            }
        });
    };

    // post function
    var post = function(req, res){
        // convert to model
        var item = new Item(req.body);
        if (item){
            item.properties.timestamp = new Date();
        };

        // check for missing information
        if(!req.body.properties.featureTypeId){
            res.status(400);
            res.send('Feature type missing');
        }
        else {
            if(req.body.properties.featureTypeId == 16 || req.session.userInfo.role == 'admin') {
                // save item to db
                item.save();
                res.status(201);
                res.send(item);
            }
            else {
                // user rights limited
                res.status(403);
                res.send('not allowed');
            };
        };
    };

    // return functions
    return {
        get: get,
        post: post
    };
};

// export controller function
module.exports = itemController;