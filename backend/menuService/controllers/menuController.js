var menuController = function(Category){
    // get function
    var get = function(req, res){
        // aggregate category with featureType
        Category.aggregate([
            {
                $lookup: {
                    from: 'featureType',
                    localField: '_id',
                    foreignField: 'categoryId',
                    as: 'submenu'
                },
            },
            {
                $project: { 
                    _id: 0,
                    'submenu._id' : 0,
                    'submenu.categoryId': 0,
                    'submenu.geometryType': 0
                }
            }
        ], function(err, menu){
            if (err) 
                res.status(500).send(err);
            else
                res.json(menu);
        });
    }

    // return functions
    return {
        get: get
    }
};

// export controller function
module.exports = menuController;