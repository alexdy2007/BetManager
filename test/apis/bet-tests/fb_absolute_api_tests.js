/**
 * Created by ayoung on 11/09/16.
 */

process.env.NODE_ENV = 'test';

var assert = require('chai').assert;
var expect = require('chai').expect;
var agent44 = require('./../../helpers/auth_agent');
var mockbets = require('./mock.bets');


describe('fb_absolute api check', function() {

    var server;
    var app;
    var fixtures = {};

    var users = {
        user1 : {email:"alexdy2007@gmail.com", password:"test"},
        user2 : {email:"user2@test.com" , password:"test1"}
    };
    
    beforeEach(function () {
        var appAndServer = require('./../../testServer');
        server = appAndServer.server;
        app = appAndServer.app;
    });
    afterEach(function () {
        server.close();
    });


    describe('Check get all bets in fb_absolute type for user 1', function() {
        it('has 2 bets in total', function() {
            return agent44.authenticate(app, users.user1).then(function(agent){
                  return agent
                    .get('/api/bet?bettype=fb_absolute')
                    .expect(200)
                    .then(function(res){
                        commonAssertions(res);
                        assert.lengthOf(res.body.results,2 , "there are 2 bets returned");
                    }).catch(function(err){
                        throw err;
                    });
            }).catch(function(err){
                throw err
            });
        });
    });

    describe('Check get all bets in fb_absolute type for user 2', function() {
        it('has 1 bets in total', function() {
            return agent44.authenticate(app, users.user2).then(function(agent){
                return agent
                    .get('/api/bet?bettype=fb_absolute')
                    .expect(200)
                    .then(function(res){
                        commonAssertions(res);
                        assert.lengthOf(res.body.results,1 , "there are 2 bets returned");
                    }).catch(function(err){
                        throw err;
                    });
            }).catch(function(err){
                throw err
            });
        });
    });

    describe('Can insert new bet in fb_absolute into existing bet case for fb_absolute', function() {
        it('inserts one bet then returns added bet', function() {
            return agent44.authenticate(app, users.user1).then(function(agent){
                return agent
                    .post('/api/bet?betmarket=fb_absolute')
                    .send(mockbets.fb_absolute.bet1)
                    .expect(200)
                    .then(function(res){
                        commonAssertions(res);
                        assert.lengthOf(res.body.results,1 , "one bet is added");
                        assert.equal(res.body.results[0].commission, mockbets.fb_absolute.bet1.commission , "check commission matches one added");
                        assert.equal(res.body.results[0].betcaseid,  mockbets.fb_absolute.bet1.betcaseid, "check betcaseid matches one added");
                        assert.equal(res.body.results[0].sportid,  mockbets.fb_absolute.bet1.sportid, "check sportid matches one added");
                        fixtures.betadded1 = res.body.results[0]
                    }).catch(function(err){
                        throw err;
                    });
            }).catch(function(err){
                throw err
            });
        });
    });

    describe('Can insert new bet in fb_absolute without existing bet case', function() {
        it('creates new event and inserts new bet. returns bet added', function() {
            return agent44.authenticate(app, users.user1).then(function(agent){
                return agent
                    .get('/api/bet?betmarket=fb_absolute')
                    .send(mockbets.fb_absolute.bet1)
                    .expect(200)
                    .then(function(res){
                       throw new Error("HAVE NOT IMPLEMENTED")
                    }).catch(function(err){
                        throw err;
                    });
            }).catch(function(err){
                throw err
            });
        });
    });

    describe('Delete bet from fb_absolute', function() {
        it('removes bet for fb_absolut table', function() {
            return agent44.authenticate(app, users.user1).then(function(agent){
                return agent
                    .post('/api/bet?betmarket=fb_absolute')
                    .send(mockbets.fb_absolute.bet1)
                    .expect(200)
                    .then(function(res){
                        throw new Error("HAVE NOT IMPLEMENTED")
                    }).catch(function(err){
                        throw err;
                    });
            }).catch(function(err){
                throw err
            });
        });
    });

    describe('Edit bet in fb_absolute', function() {
        it('edits bet and returns new modifed bet', function() {
            return agent44.authenticate(app, users.user1).then(function(agent){
                return agent
                    .post('/api/bet?betmarket=fb_absolute')
                    .send(mockbets.fb_absolute.bet1)
                    .expect(200)
                    .then(function(res){
                        throw new Error("HAVE NOT IMPLEMENTED")
                    }).catch(function(err){
                        throw err;
                    });
            }).catch(function(err){
                throw err
            });
        });
    });


    function commonAssertions(res){
        expect(res).to.be.json;
        expect(res).to.have.status(200);

    }

});