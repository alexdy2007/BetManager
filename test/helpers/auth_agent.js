/**
 * Created by ayoung on 11/09/16.
 */

var request = require('supertest-as-promised');
var authenticated;
var expect = require('chai').expect;
var Promise = require('promise');
var AGENT = {};

AGENT.authenticate = authenticate;


function authenticate(application, user){
    authenticated = request.agent(application);
        return authenticated
            .post('/auth/login')
            .send(user)
            .expect(200)
            .then(function (res) {
                expect(res).to.have.cookie('remember_me');
                commonAssertions(res);
                return authenticated;
            }).catch(function (err) {
                throw err
        });
}


function commonAssertions(res){
    expect(res).to.be.json;
    expect(res).to.have.status(200);

}

module.exports = AGENT;