/**
 * Created by ayoung on 24/09/16.
 */

process.env.NODE_ENV = 'test';

if (!global.Promise) {
    global.Promise = require('promise');
}

//Require the dev-dependencies
var chai = require('chai')
    , chaiHttp = require('chai-http');

var assert = require('chai').assert;
var expect = require('chai').expect;

chai.use(chaiHttp);

var users = {
    user1 : {email:"alexdy2007@gmail.com", password:"test"},
    user2 : {email:"user2@test.com" , password:"test1"}
};
var agent44 = require('./../helpers/auth_agent');


describe('BetMarket api tests', function() {

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


    describe('Get bet status from api', function() {
        it('Has 5 premade bet statuses', function() {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .get('/api/betstatus/')
                    .then(function (res) {
                        commonAssertions(res);
                        assert.lengthOf(res.body.data, 5, "5 betmarkets expected");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            })
        });
    });

    describe('Get individual bet status from api', function() {
        it('1 bet status returned', function() {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .get('/api/betStatus/1')
                    .then(function (res) {
                        commonAssertions(res);
                        assert.equal(res.body.data[0].name, 'PENDING', "check name is correct");
                        assert.lengthOf(res.body.data, 1, "1 betstatus returned");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        })
    });

    describe('Insert new betstatus api', function() {
        it('Adds a new betstatus', function() {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .post('/api/betstatus/')
                    .send({name: "test status"})
                    .then(function (res) {
                        expect(res).to.have.status(201);
                        assert.lengthOf(res.body.data, 1, "expect return of added betstatus");
                        assert.equal(res.body.data[0].name, "test status", "check name of betstatus added is correct");
                        fixture.betStatusAddedId = res.body.data[0].id;
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        });
    });

    describe('Updates bet status from api', function() {
        it('Updates a bet status', function() {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .put('/api/betstatus/' + fixture.betStatusAddedId)
                    .send({name:"bet test2"})
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        assert.lengthOf(res.body.data, 1, "expect return of updated betstatus");
                        assert.equal(res.body.data[0].name, 'bet test2', "check name is updated correctly");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        });
    });

    describe('Delete bet status from api', function() {
        it('Deletes bet status account', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .delete('/api/betstatus/' + fixture.betStatusAddedId)
                    .then(function (res) {
                        commonAssertions(res);
                        assert.equal(res.body.data[0].id, fixture.betStatusAddedId, "expect deleted betstatus to have id of " + fixture.betStatusAddedId);
                    })
                    .catch(function (err) {
                        throw err
                    })
            })
        });

        it('Checks see if original betstatuses exist', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .get('/api/betstatus/')
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        assert.lengthOf(res.body.data, 5);
                    })
                    .catch(function (err) {
                        throw err
                    })
            });
        });
    });

    function commonAssertions(res){
        expect(res).to.be.json;
        expect(res).to.have.status(200);
    }

});