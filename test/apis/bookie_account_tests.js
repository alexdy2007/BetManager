/**
 * Created by ayoung on 15/09/16.
 */

process.env.NODE_ENV = 'test';

if (!global.Promise) {
    global.Promise = require('promise');
}

//Require the dev-dependencies
var chai = require('chai');

var assert = require('chai').assert;
var should = chai.should;
var expect = require('chai').expect;


var users = {
    user1: {email: "alexdy2007@gmail.com", password: "test"},
    user2: {email: "user2@test.com", password: "test1"}
};
var agent44 = require('./../helpers/auth_agent');


describe('Bookie User Account api tests', function () {

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


    describe('Get bookie account from api', function () {
        it('Has 4 premade user bookie accounts', function () {
            return agent44.authenticate(app, users.user2).then(function (agent) {
                return agent
                    .get('/api/bookieaccount/')
                    .then(function (res) {
                        commonAssertions(res);
                        assert.lengthOf(res.body.data, 4, "4 user bookies accounts expected");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            })
        });
    });

    describe('Get individual bookie from api', function () {
        it('Returns 1 user bookie account', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .get('/api/bookieaccount/1')
                    .then(function (res) {
                        commonAssertions(res);
                        assert.lengthOf(res.body.data, 1, "1 bookie account returned");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        })
    });

    describe('Insert new bookie account from api', function () {
        it('Adds a new bookie account', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                var new_bookie_details = {
                    bookieid: "6",
                    accountid: 1,
                    username: "user1Bookie6",
                    commission: 0.10
                };
                return agent
                    .post('/api/bookieaccount/')
                    .send(new_bookie_details)
                    .then(function (res) {
                        expect(res).to.have.status(201);
                        assert.lengthOf(res.body.data, 1, "Expect return of added user bookie account");
                        assert.equal(res.body.data[0].commission, '0.1', "check default commission is correct");
                        assert.equal(res.body.data[0].accountid, 1, "Check accountid is correct");
                        fixture.addedBookieAccountId = res.body.data[0].id;
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        });
    });

    describe('Updates bookie account 6 from api', function () {
        it('Update bookie account 6', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                var edit_bookie_details = {
                    id: fixture.addedBookieAccountId,
                    bookieid: "5",
                    username: "user1Update",
                    commission: 0.06
                };
                return agent
                    .put('/api/bookieaccount/' + fixture.addedBookieAccountId)
                    .send(edit_bookie_details)
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        assert.lengthOf(res.body.data, 1, "Expect return of added user bookie account");
                        assert.equal(res.body.data[0].commission, '0.06', "Check default commission is correct for updated bookie account");
                        assert.equal(res.body.data[0].username, "user1Update", "Check username update is correct");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        });
    });

    describe('Delete user bookie account from api', function () {
        var tempAgent;
        it('Deletes user bookie account', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                tempAgent = agent;
                return agent
                    .delete('/api/bookieaccount/' + fixture.addedBookieAccountId)
                    .then(function (res) {
                        commonAssertions(res);
                        assert.equal(res.body.data[0].id, fixture.addedBookieAccountId, "expect deleted user bookie account to have id of " + fixture.addedBookieId);
                    })
                    .catch(function (err) {
                        throw err
                    })
            })
        });

        it('Checks see if original user bookie accounts exist', function () {
            return tempAgent
                .get('/api/bookieaccount/')
                .then(function (res) {
                    expect(res).to.have.status(200);
                    assert.lengthOf(res.body.data, 4);
                })
                .catch(function (err) {
                    throw err
                })
        });
    });

    function commonAssertions(res) {
        expect(res).to.be.json;
        expect(res).to.have.status(200);
    }

});


//add agent