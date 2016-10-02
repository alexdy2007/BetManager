/**
 * Created by ayoung on 11/09/16.
 */

process.env.NODE_ENV = 'test';

var assert = require('chai').assert;
var expect = require('chai').expect;
var agent44 = require('./../../helpers/auth_agent');
var mockbets = require('./mock.bets');


describe('bet winner api check', function () {

    var server;
    var app;
    var fixtures = {};

    var users = {
        user1: {email: "alexdy2007@gmail.com", password: "test"},
        user2: {email: "user2@test.com", password: "test1"}
    };

    beforeEach(function () {
        var appAndServer = require('./../../testServer');
        server = appAndServer.server;
        app = appAndServer.app;
    });
    afterEach(function () {
        server.close();
    });

    describe('Check get all bets user 1', function () {

        var tempAgent;
        it('has 6 bets in total under fb_absolute', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                tempAgent = agent;
                return agent
                    .get('/api/bet?betmarket=winner')
                    .expect(200)
                    .then(function (res) {
                        commonAssertions(res);
                        assert.lengthOf(res.body.data, 6, "there are 6 bets returned");
                    }).catch(function (err) {
                        throw err;
                    });
            }).catch(function (err) {
                throw err
            });
        });

        it('has 8 under all bets in total', function () {
            return tempAgent
                .get('/api/bet')
                .expect(200)
                .then(function (res) {
                    commonAssertions(res);
                    assert.lengthOf(res.body.data, 8, "there are 8 bets returned");
                }).catch(function (err) {
                    throw err;
                });
        });
    });

    describe('Check get all bets for user 2', function () {
        it('has 4 bets in total', function () {
            return agent44.authenticate(app, users.user2).then(function (agent) {
                return agent
                    .get('/api/bet')
                    .expect(200)
                    .then(function (res) {
                        commonAssertions(res);
                        assert.lengthOf(res.body.data, 4, "there are 4 bets returned");
                    }).catch(function (err) {
                        throw err;
                    });
            }).catch(function (err) {
                throw err
            });
        });
    });

    describe('Can insert new bet in fb_absolute into existing bet case for fb_absolute', function () {
        it('Inserts bet1 then returns added bet', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                return agent
                    .post('/api/bet?betmarket=winner')
                    .send(mockbets.fb_absolute.bet1)
                    .expect(200)
                    .then(function (res) {
                        commonAssertions(res);
                        assert.lengthOf(res.body.data, 1, "one bet is added");
                        assert.equal(res.body.data[0].commission, mockbets.fb_absolute.bet1.commission, "check commission matches one added");
                        assert.equal(res.body.data[0].betcaseid, mockbets.fb_absolute.bet1.betcaseid, "check betcaseid matches one added");
                        assert.equal(res.body.data[0].betmarketid, mockbets.fb_absolute.bet1.betmarketid, "check betmarketid matches one added");
                        fixtures.betadded1 = res.body.data[0]
                    }).catch(function (err) {
                        throw err;
                    });
            }).catch(function (err) {
                throw err
            });
        });
    });

    describe('Update bet1 in fb_absolute', function () {
        var tempagent;
        it('Update bet and returns new modifed bet', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                tempagent = agent;
                return agent
                    .put('/api/bet/' + fixtures.betadded1.id)
                    .send(mockbets.fb_absolute.bet1Update)
                    .expect(200)
                    .then(function (res) {
                        commonAssertions(res);
                        console.log(res.body.data[0].bet_specific);
                        console.log(res.body.data[0].bet_specific.hometeamselected);
                        assert.lengthOf(res.body.data, 1, "one bet is added");
                        assert.equal(res.body.data[0].commission, mockbets.fb_absolute.bet1Update.commission, "check commission matches one added");
                        assert.equal(res.body.data[0].betcaseid, mockbets.fb_absolute.bet1Update.betcaseid, "check betcaseid matches one added");
                        assert.equal(res.body.data[0].betmarketid, mockbets.fb_absolute.bet1Update.betmarketid, "check betmarketid matches one added");
                        assert.equal(res.body.data[0].bet_specific.hometeamselected, mockbets.fb_absolute.bet1Update.bet_specific.hometeamselected, "check hometeamselected matches one added");
                    }).catch(function (err) {
                        throw err;
                    });
            }).catch(function (err) {
                throw err
            });
        });

        it('Updates bet1 changing only hometeam in bet_specific', function () {
            return tempagent
                .put('/api/bet/' + fixtures.betadded1.id)
                .send(mockbets.fb_absolute.bet1UpdatePart2)
                .expect(200)
                .then(function (res) {
                    commonAssertions(res);
                    assert.lengthOf(res.body.data, 1, "one bet is added");
                    assert.equal(res.body.data[0].bet_specific.hometeam, mockbets.fb_absolute.bet1UpdatePart2.bet_specific.hometeam, "check hometeam matches one updated");
                    assert.equal(res.body.data[0].bet_specific.awayteam, mockbets.fb_absolute.bet1Update.bet_specific.awayteam, "check away matches stays the same");
                    assert.equal(res.body.data[0].bet_specific.hometeamselected, mockbets.fb_absolute.bet1Update.bet_specific.hometeamselected, "check home team stays the same");
                    assert.equal(res.body.data[0].commission, mockbets.fb_absolute.bet1Update.commission, "check commission stays the same");
                }).catch(function (err) {
                    throw err;
                });
        });
    });




    describe('Can insert new bet in winner without existing bet case', function () {

        var tempAgent;
        it('Creates new event and inserts new bet. returns bet added', function () {
            return agent44.authenticate(app, users.user2).then(function (agent) {
                tempAgent = agent;
                return agent
                    .post('/api/bet?betmarket=winner')
                    .send(mockbets.fb_absolute.bet2)
                    .expect(200)
                    .then(function (res) {
                        assert.lengthOf(res.body.data, 1, "one bet is added");
                        assert.equal(res.body.data[0].commission, mockbets.fb_absolute.bet2.commission, "check commission matches one added");
                        assert.equal(res.body.data[0].bookieaccountid, mockbets.fb_absolute.bet2.bookieaccountid, "check bookieaccountid  matches one added");
                        assert.equal(res.body.data[0].betmarketid, mockbets.fb_absolute.bet2.betmarketid, "check betmarketid matches one added");
                        fixtures.betAdded2 = res.body.data[0]
                    }).catch(function (err) {
                        throw err;
                    });
            }).catch(function (err) {
                throw err
            });
        });

        it('Then check bet case is created correctly', function () {
            return tempAgent
                .get('/api/betcase/' + fixtures.betAdded2.betcaseid)
                .expect(200)
                .then(function (res) {
                    console.log(res.body.data[0]);
                    assert.equal(res.body.data[0].id, fixtures.betAdded2.betcaseid, "check betcaseid matches one added");
                    assert.equal(res.body.data[0].accountid, 2, "check accountid matches user2 account id");
                    assert.equal(res.body.data[0].sportid, 1, "check sportid matches one of betmarket added to betcase");
                }).catch(function (err) {
                    throw err;
                });
        });
    });

    describe('Delete bet from winner', function () {

        var tempAgent;
        it('Removes bet1 from winner table', function () {
            return agent44.authenticate(app, users.user1).then(function (agent) {
                tempAgent = agent;
                return agent
                    .delete('/api/bet/' + fixtures.betadded1.id + "?betmarket=winner")
                    .expect(200)
                    .then(function (res) {
                        assert.equal(res.body.data[0].id, fixtures.betadded1.id, "check bet id matches one deleted");
                    }).catch(function (err) {
                        throw err;
                    });
            }).catch(function (err) {
                throw err
            });
        });

        it('Checks deleted bet1 does not exist', function () {
            return tempAgent
                .get('/api/bet/' + fixtures.betadded1.id)
                .expect(200)
                .then(function (res) {
                    assert.lengthOf(res.body.data, 0, "check recently deleted bet does not exist");
                }).catch(function (err) {
                    throw err;
                });
        });

        it('Removes bet2 from winner table', function () {
            return agent44.authenticate(app, users.user2).then(function (agent) {
                return agent
                    .delete('/api/bet/' + fixtures.betAdded2.id + "?betmarket=winner")
                    .expect(200)
                    .then(function (res) {
                        assert.equal(res.body.data[0].id, fixtures.betAdded2.id, "check bet id matches one deleted");
                    }).catch(function (err) {
                        throw err;
                    });
            }).catch(function (err) {
                throw err
            });
        });
    });


    function commonAssertions(res) {
        expect(res).to.be.json;
        expect(res).to.have.status(200);

    }

});