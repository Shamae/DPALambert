var express = require('express');

var routes = function(Category){
    // initialize result
    var menuRouter = express.Router();

    // get controller
    var menuController = require('../controllers/menuController')(Category)

    // config routes
    menuRouter.route('/')
        .get(menuController.get);

    return menuRouter;
};

// export route function
module.exports = routes;