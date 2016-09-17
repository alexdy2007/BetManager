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
var expect = require('chai').expect;


var users = {
    user1: {email: "alexdy2007@gmail.com", password: "test"},
    user2: {email: "user2@test.com", password: "test1"}
};
var agent44 = require('./../helpers/auth_agent');


describe('Bookie Account OverView tests', function () {

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


    describe('get account overview when logged on as user 1', function () {
        it('get account overview', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .get('/api/bookieaccount/')
                    .then(function (res) {
                        commonAssertions(res);
                        assert.lengthOf(res.body.data, 4, "4 bookie account overview appear");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            })
        });
    });

    describe('get account overview when logged on as user 2', function () {
        it('get account overview', function () {
            return agent44.authenticate(app, users.user2).then(function (agent) {
                return agent
                    .get('/api/bookieaccount/')
                    .then(function (res) {
                        commonAssertions(res);
                        assert.lengthOf(res.body.data, 4, "4 bookie account overview appear");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            })
        });
    });


    function commonAssertions(res) {
        expect(res).to.be.json;
        expect(res).to.have.status(200);
    }

});

