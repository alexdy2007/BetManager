/**
 * Created by ayoung on 08/09/16.
 */

process.env.NODE_ENV = 'test';

if (!global.Promise) {
    global.Promise = require('promise');
}

//Require the dev-dependencies
var chai = require('chai');

var agent44 = require('./../helpers/auth_agent');

var assert = require('chai').assert;
var should = chai.should;
var expect = require('chai').expect;


describe('Betcase api test', function () {

    var server;
    var app;
    var fixture = {};

    var users = {
        user1: {email: "alexdy2007@gmail.com", password: "test"},
        user2: {email: "user2@test.com", password: "test1"}
    };

    beforeEach(function () {
        var appAndServer = require('./../testServer');
        server = appAndServer.server;
        app = appAndServer.app;
    });
    afterEach(function () {
        server.close();
    });


    describe('Get betcases from api', function () {
        it('User 1 has 3 premade betcases accounts', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent.get('/api/betcase/')
                    .then(function (res) {
                        commonAssertions(res);
                        assert.lengthOf(res.body.data, 5, "5 betcases expected");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        });
    });

    describe('Insert new betcase account from api', function () {
        it('Adds a new betcase account', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .post('/api/betcase/')
                    .send({accountid: "1", sportid: 1, statusactive: "TRUE"})
                    .then(function (res) {
                        expect(res).to.have.status(201);
                        assert.lengthOf(res.body.data, 1, "expect return of added betcase");
                        assert.equal(res.body.data[0].sportid, 1, "check default sportid is correct");
                        assert.equal(res.body.data[0].statusactive, true, "check betcase is correct");
                        fixture.addedBetCaseId = res.body.data[0].id;
                    })
                    .catch(function (err) {
                        throw err;
                    })

            });
        });
    });


    describe('Updates betcase account from api', function () {
        it('Updates betcase account', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .put('/api/betcase/' + fixture.addedBetCaseId)
                    .send({id:fixture.addedBetCaseId, accountid: "1", sportid: 1, statusactive: "FALSE"})
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        assert.lengthOf(res.body.data, 1, "expect return of added betcase");
                        assert.equal(res.body.data[0].statusactive, false, "check account status update is correct");
                    })
                    .catch(function (err) {
                        throw err;
                    })

            });
        });
    });

    describe('Delete bookie account from api', function () {
        var testAgent;
        it('Deletes bookie account', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                testAgent = agent;
                return testAgent
                    .delete('/api/betcase/' + fixture.addedBetCaseId)
                    .then(function (res) {
                        commonAssertions(res);
                        assert.equal(res.body.data[0].id, fixture.addedBetCaseId, "expect deleted bet case to have id of " + fixture.addedBookieId);
                    })
                    .catch(function (err) {
                        throw err
                    })
            });
        });

        it('Checks see if original about of bet cases exist', function () {
            return testAgent
                .get("/api/betcase/")
                .then(function (res) {
                    expect(res).to.have.status(200);
                    assert.lengthOf(res.body.data, 5);
                })
                .catch(function (err) {
                    throw err
                });
        });
    })
});

function commonAssertions(res) {
    expect(res).to.be.json;
    expect(res).to.have.status(200);
}
