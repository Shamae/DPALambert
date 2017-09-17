var express = require('express');

var routes = function(Item){
    // initialize result
    var itemRouter = express.Router();

    // get controller
    var itemController = require('../controllers/itemController')(Item)

    // config routes
    itemRouter.route('/')
        .get(itemController.get)
        .post(itemController.post);

    // routes with itemId
    itemRouter.use('/:itemId', function(req, res, next){
        Item.findById(req.params.itemId, function (err, item){
            if(err) {
                res.status(500);
                res.send(err);
            }
            else if(item){
                req.item = item;
                next();
            }
            else {
                res.status(404);
                res.send('no item found')
            };
        });
    });
    // config routes with itemId
    // TODO define

    return itemRouter;
};

// export route function
module.exports = routes;