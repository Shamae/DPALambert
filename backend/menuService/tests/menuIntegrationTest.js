var should = require('should'),
    request = require('supertest'),
    app = require('../menuServer.js'),
    mongoose = require('mongoose'),
    Category = mongoose.model('category'),
    agent = request.agent(app);

// menu integration test
describe('Menu Test', function(){
    beforeEach(function(done){
        // mock data in test db
        var testCategory = {displayName: 'testCategory'}
        var category = new Category(testCategory);
        category.save();
        done();
    });

    it('should get the menu as json', function(done){
        agent.get('/api/menu')
             .expect(200)
             .end(function(err, results){
                // it should return a json
                results.should.be.json;
                // it should be an array of categories
                results.body.should.be.instanceOf(Array);
                // testing length, only one category should exist
                results.body.should.have.have.length(1);
                // NOTE: is there a way to test for a value in the array with should?
                done();
             });
    });

    afterEach(function(done){
        // clean up test data
        Category.remove().exec();
        done();
    });
});