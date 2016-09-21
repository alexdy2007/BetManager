/**
 * Created by ayoung on 01/09/16.
 */
var format = require('string-format');
var conn = require('./../db/queryDB');
var randtoken = require('rand-token');
var sessionCookieService = {};

sessionCookieService.saveToken = function(id, token, fn){
    var sql = format("INSERT INTO sessionstore(userid, cookiehash) values('{}', '{}') RETURNING *", id, token);
    conn.queryDB(sql)
        .then(function(results){
            fn(null, results);
        }).catch(function(reason){
            console.log(reason);
            return fn(reason, null)
        });
};

sessionCookieService.getToken = function(token, fn){
    var sql = format("SELECT * FROM sessionstore WHERE cookiehash='{}'", token)
    conn.queryDB(sql)
        .then(function(data){
            if(data.results.length != 0) {
                return fn(null, data.results);
            }else{
                return fn("No token found", null);
            }
        }).catch(function(reason){
        console.log("ERROR");
        return fn(reason, null);
    });
};

sessionCookieService.removeToken = function(token){
    
    var sql = format("DELETE FROM sessionstore WHERE cookiehash='{}' RETURNING *", token);
    conn.queryDB(sql)
        .then(function(results){
            return fn(null, results);
        }).catch(function(reason){
        return fn(reason, null);
    });
};


sessionCookieService.generateCookie = function(){
    return randtoken.generate(32);
};

module.exports = sessionCookieService;