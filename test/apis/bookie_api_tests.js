/**
 * Created by ayoung on 08/09/16.
 */
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

chai.use(chaiHttp);

var users = {
    user1 : {email:"alexdy2007@gmail.com", password:"test"},
    user2 : {email:"user2@test.com" , password:"test1"}
};
var agent44 = require('./../helpers/auth_agent');


describe('Bookie api tests', function() {

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


    describe('get bookies from api', function() {
        it('has 5 premade bookie accounts', function() {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .get('/api/bookie/')
                    .then(function (res) {
                        commonAssertions(res);
                        assert.lengthOf(res.body.data, 45, "45 bookies expected");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            })
        });
    });

    describe('Get individual bookie from api', function() {
        it('1 book returned', function() {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .get('/api/bookie/1')
                    .then(function (res) {
                        commonAssertions(res);
                        assert.lengthOf(res.body.data, 1, "1 bookie returned");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        })
    });

    describe('Insert new bookie account from api', function() {
        it('Adds a new bookie account', function() {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .post('/api/bookie/')
                        .send({name: "testBookie", website: "www.testwebsite.com", defaultcommission: "0.04"})
                        .then(function (res) {
                            expect(res).to.have.status(201);
                            assert.lengthOf(res.body.data, 1, "expect return of added bookie");
                            assert.equal(res.body.data[0].defaultcommission, '0.04', "check default commission is correct");
                            assert.equal(res.body.data[0].website, "www.testwebsite.com", "check website is correct");
                            fixture.addedBookieId = res.body.data[0].id;
                        })
                        .catch(function (err) {
                            throw err;
                        })
            });
        });
    });

    describe('Updates bookie account from api', function() {
        it('Updates a bookie account', function() {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .put('/api/bookie/' + fixture.addedBookieId)
                    .send({name: "testUpdateBookie", website: "www.testupdatewebsite.com", defaultcommission: "0.08"})
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        assert.lengthOf(res.body.data, 1, "expect return of added bookie");
                        assert.equal(res.body.data[0].name, 'testUpdateBookie', "check name is updated correctly");
                        assert.equal(res.body.data[0].defaultcommission, '0.08', "check default commission is updated correctly");
                        assert.equal(res.body.data[0].website, "www.testupdatewebsite.com", "check website is updated correctly");
                        fixture.addedBookieId = res.body.data[0].id;
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        });
    });

    describe('Delete bookie account from api', function() {
        it('Deletes bookie account', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .delete('/api/bookie/' + fixture.addedBookieId)
                    .then(function (res) {
                        commonAssertions(res);
                        assert.equal(res.body.data[0].id, fixture.addedBookieId, "expect deleted bookie to have id of " + fixture.addedBookieId);
                    })
                    .catch(function (err) {
                        throw err
                    })
            })
        });

        it('Checks see if original bookie exist', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .get('/api/bookie/')
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        assert.lengthOf(res.body.data, 45);
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


//add agent