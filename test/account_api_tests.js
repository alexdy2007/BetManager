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


describe('User', function() {

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
    
    
    describe('get accounts from api', function() {
        it('has 3 premade accounts', function() {
            return chai.request(app)
                .get('/api/accounts/')
                .then(function(res){
                    commonAssertions(res);
                    assert.lengthOf(res.body, 3, "3 users expected");
                })
                .catch(function(err){
                    throw err;
                })
        });
    });

    describe('insert a new account from api', function() {
        it('adds new account', function() {
            return chai.request(app)
                .post('/api/accounts/')
                .send({expirydate:"2018-05-01", userid:2, accounttypeid:1})
                .then(function(res){
                    commonAssertions(res);
                    assert.lengthOf(res.body, 1, "expect returned response of 1");
                    assert.equal(res.body[0].userid, 2, "expect return data of what has just been sent");
                    fixture.addedAccountId = res.body[0].id;
                })
                .catch(function(err){
                    throw err;
                })
        });
    });

    describe('deletes account for hitting api', function() {
        it('deletes a account', function() {
            return chai.request(app)
                .delete('/api/accounts/' + fixture.addedAccountId)
                .then(function(res){
                    commonAssertions(res);
                    assert.equal(res.body[0].id, fixture.addedAccountId, "expect deleted account to have id of " + fixture.addedAccountId);
                    return chai.request(app).get('/api/accounts/')
                        .then(function(res){
                            expect(res).to.have.status(200);
                            assert.lengthOf(res.body,3);
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