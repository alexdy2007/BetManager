/**
 * Created by ayoung on 08/09/16.
 */

process.env.NODE_ENV = 'test';

if (!global.Promise) {
    global.Promise = require('promise');
}

//Require the dev-dependencies
var chai = require('chai')
    , chaiHttp = require('chai-http');

var assert = require('chai').assert;
var should = chai.should;
var expect = require('chai').expect;
var agent44 = require('./../helpers/auth_agent');
chai.use(chaiHttp);

var users = {
    user1: {email: "alexdy2007@gmail.com", password: "test"},
    user2: {email: "user2@test.com", password: "test1"}
};


describe('User api tests', function() {

    var server;
    var app;
    var fixture = {};

    beforeEach(function () {
        var appAndServer = require('./../testServer');
        server = appAndServer.server;
        app = appAndServer.app;
    });
    afterEach(function () {
        server.close();
    });
    
    
    describe('Get accounts from api', function() {
        it('Has 3 premade accounts', function() {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .get('/api/accounts/')
                    .then(function (res) {
                        commonAssertions(res);
                        assert.lengthOf(res.body.data, 3, "3 users expected");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        });
    });

    describe('Insert a new account from api', function() {
        it('Adds new account', function() {
            return agent44.authenticate(app, users.user2).then(function (agent) {
                return agent
                    .post('/api/accounts/')
                    .send({expirydate: "2018-05-01", userid: 2, accounttypeid: 1})
                    .then(function (res) {
                        expect(res).to.have.status(201);
                        assert.lengthOf(res.body.data, 1, "expect returned response of 1");
                        assert.equal(res.body.data[0].userid, 2, "expect return data of what has just been sent");
                        fixture.addedAccountId = res.body.data[0].id;
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        });
    });

    describe('Updates a new account from api', function() {
        it('Updates new account', function() {
            return agent44.authenticate(app, users.user2).then(function (agent) {
                return agent
                    .put('/api/accounts/' + fixture.addedAccountId)
                    .send({id: fixture.addedAccountId, expirydate: "2018-05-01", userid: 2, accounttypeid: 2})
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        assert.lengthOf(res.body.data, 1, "expect returned response of 1");
                        assert.equal(res.body.data[0].accounttypeid, 2, "expect account type to be updated");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        });
    });

    describe('Deletes account for hitting api', function() {
        var tempagent;
        it('Deletes a account', function () {
            return agent44.authenticate(app, users.user2).then(function (agent) {
                tempagent = agent;
                return tempagent
                    .delete('/api/accounts/' + fixture.addedAccountId)
                    .then(function (res) {
                        commonAssertions(res);
                        assert.equal(res.body.data[0].id, fixture.addedAccountId, "expect deleted account to have id of " + fixture.addedAccountId);
                    })
                    .catch(function (err) {
                        throw err
                    })
            });
        });

        it('Checks to make sure account has been deleted', function () {
            return tempagent
                .get('/api/accounts/')
                .then(function (res) {
                    expect(res).to.have.status(200);
                    assert.lengthOf(res.body.data, 3);
                })
                .catch(function (err) {
                    throw err
                })
        });
    });

    function commonAssertions(res){
        expect(res).to.be.json;
        expect(res).to.have.status(200);

    }

});