/**
 * Created by ayoung on 11/09/16.
 */

var assert = require('assert');
var expect = require('chai').expect;
var agent44 = require('./../helpers/auth_agent');


describe('Authentication api tests', function() {

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

    
    describe('can login', function(){
        it ('should login as user and save persistance cookie', function(){
            user = {email:"alexdy2007@gmail.com", password:"test"};
            return agent44.authenticate(app, user).then(function(authenticated){
                assert(authenticated, "check agent is returned");
            })

        });
    });
});


function commonAssertions(res){
    expect(res).to.be.json;
    expect(res).to.have.status(200);
}

