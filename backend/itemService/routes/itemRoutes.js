var express = require('express');

var routes = function(Item){
    // initialize result
    var itemRouter = express.Router();

    // get controller
    var itemController = require('../controllers/itemController')(Item)

    // config routes
    itemRouter.route('/')
        .get(itemController.get);

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
        .get(function(req, res){
            // get item from req
            var returnItem = req.item.toJSON();
            // return item
            res.json(returnItem);
        });

    return itemRouter;
};

// export route function
module.exports = routes;