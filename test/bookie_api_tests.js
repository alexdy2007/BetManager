/**
 * Created by ayoung on 08/09/16.
 */
/**
 * Created by ayoung on 08/09/16.
 */

process.env.NODE_ENV = 'test';

if (!global.Promise) {
    console.log("here");
    global.Promise = require('promise');
}

//Require the dev-dependencies
var chai = require('chai')
    , chaiHttp = require('chai-http');

var assert = require('chai').assert;
var should = chai.should;
var expect = require('chai').expect;

chai.use(chaiHttp);


describe('Bookie', function() {

    var server;
    var app;
    var fixture = {};

    beforeEach(function () {
        var appAndServer = require('./testServer');
        server = appAndServer.server;
        app = appAndServer.app;
    });
    afterEach(function () {
        server.close();
    });


    describe('get bookies from api', function() {
        it('has 5 premade bookie accounts', function() {
            return chai.request(app)
                .get('/api/bookie/')
                .then(function(res){
                    commonAssertions(res);
                    assert.lengthOf(res.body, 5, "5 users expected");
                })
                .catch(function(err){
                    throw err;
                })
        });
    });

    describe('insert new bookie account from api', function() {
        it('adds a new bookie account', function() {
            return chai.request(app)
                .post('/api/bookie/')
                .send({name:"testBookie", "website":"www.testwebsite.com", defaultcommission:"0.04"})
                .then(function(res){
                    commonAssertions(res);
                    assert.lengthOf(res.body, 1, "expect return of added bookie");
                    assert.equal(res.body[0].defaultcommission, '0.04', "check default commission is correct");
                    assert.equal(res.body[0].website, "www.testwebsite.com", "check website is correct");
                    fixture.addedBookieId = res.body[0].id;
                })
                .catch(function(err){
                    throw err;
                })
        });
    });

    describe('delete bookie account from api', function() {
        it('deletes bookie account', function() {
            return chai.request(app)
                .delete('/api/bookie/' + fixture.addedBookieId)
                .then(function(res){
                    commonAssertions(res);
                    assert.equal(res.body[0].id, fixture.addedBookieId, "expect deleted bookie to have id of " + fixture.addedBookieId);
                    return chai.request(app).get('/api/bookie/')
                        .then(function(res){
                            expect(res).to.have.status(200);
                            assert.lengthOf(res.body,5);
                        })
                        .catch(function(err){
                            throw err
                        })
                })
                .catch(function(err){
                    throw err
                })
        });
    });

    function commonAssertions(res){
        expect(res).to.be.json;
        expect(res).to.have.status(200);

    }

});