var express = require('express');

var routes = function(Item){
    // initialize result
    var itemRouter = express.Router();

    // get controller
    var itemController = require('../controllers/itemController')(Item)

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
        })

    // config routes
    itemRouter.route('/')
        .post(itemController.post);

    return itemRouter;
};

// export route function
module.exports = routes;