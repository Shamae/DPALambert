var should = require('should'),
    sinon = require('sinon');

// NOTE: this is just an example for future tests
//       this test is useless as there is no code in the controller beside the call to the DB

// menu controller tests
describe('Menu Controller Tests', function(){
    // get function
    describe('Get', function(){
        it('should return status 200', function(){
            // mock Category object
            var Category = function(category){};
            Category.aggregate = function(){
                res.status(200);
                return res;
            };

            // request
            var req = {};

            // response
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            // initialize controller for testing
            var menuController = require('../controllers/menuController')(Category);

            // execute function for testing
            menuController.get(req, res);

            // assertion
            res.status.calledWith(200).should.equal(true);
        });
    });
})