var express = require('express');

var routes = function(Item){
    // initialize result
    var itemRouter = express.Router();

    // get controller
    var itemController = require('../controllers/itemController')(Item)

    // config routes
    itemRouter.route('/')
        .post(itemController.post);
        
    // routes with itemId (middleware)
    itemRouter.use('/:itemId', function(req, res, next){
        Item.findById(req.params.itemId, function (err, item){
            if(err) {
                res.status(500);
                res.send(err);
            }
            else if(item){
                // put item into request
                req.item = item;
                // advance in pipeline
                next();
            }
            else {
                // item not found
                res.status(404);
                res.send('no item found')
            };
        });
    });

    // config routes with itemId
    itemRouter.route('/:itemId')
        .put(function(req,res){
            req.item.properties.displayName = req.body.properties.displayName;
            req.item.properties.description = req.body.properties.description;
            req.item.geometry.coordinates = req.body.geometry.coordinates;
            req.item.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    // return item
                    res.json(req.item);
                }
            });
        });

    return itemRouter;
};

// export route function
module.exports = routes;