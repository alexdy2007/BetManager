


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


    describe('Get betMarkets from api', function() {
        it('Has 17 premade betmarkter accounts', function() {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .get('/api/betmarket/')
                    .then(function (res) {
                        commonAssertions(res);
                        assert.lengthOf(res.body.data, 17, "17 betmarkets expected");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            })
        });
    });

    describe('Get individual betmarket from api', function() {
        it('1 betmarket returned', function() {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .get('/api/betmarket/1')
                    .then(function (res) {
                        commonAssertions(res);
                        assert.lengthOf(res.body.data, 1, "1 betmarket returned");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        })
    });

    describe('Insert new betmarket account from api', function() {
        it('Adds a new betmarket account', function() {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .post('/api/betmarket/')
                    .send({name: "first to score", sportid:1})
                    .then(function (res) {
                        expect(res).to.have.status(201);
                        assert.lengthOf(res.body.data, 1, "expect return of added bookie");
                        assert.equal(res.body.data[0].sportid, '1', "check sport id is correct");
                        assert.equal(res.body.data[0].name, "first to score", "first to score");
                        fixture.bookieAccountAdded = res.body.data[0].id;
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        });
    });

    describe('Updates betmarket account from api', function() {
        it('Updates a betmarket account', function() {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .put('/api/betmarket/' + fixture.bookieAccountAdded)
                    .send({sportid:2})
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        assert.lengthOf(res.body.data, 1, "expect return of updated betmarket");
                        assert.equal(res.body.data[0].sportid, '2', "check sportid is updated correctly");
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        });
    });

    describe('Delete betmarket account from api', function() {
        it('Deletes betmarket account', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .delete('/api/betmarket/' + fixture.bookieAccountAdded)
                    .then(function (res) {
                        commonAssertions(res);
                        assert.equal(res.body.data[0].id, fixture.bookieAccountAdded, "expect deleted betmarket to have id of " + fixture.bookieAccountAdded);
                    })
                    .catch(function (err) {
                        throw err
                    })
            })
        });

        it('Checks see if original betmarket exist', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .get('/api/betmarket/')
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        assert.lengthOf(res.body.data, 17);
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
