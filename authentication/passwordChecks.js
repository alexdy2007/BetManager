/**
 * Created by ayoung on 19/08/16.
 */
var passwordHash = require('password-hash');
var conn = require('./../db/queryDB');

hashingFunctions = {};

hashingFunctions.createHash = function(password){
    var passwordHash = require('MyReallyStrongPasswordTimes1000');
    var hashedPassword = passwordHash.generate(password);
    return hashedPassword;
}

hashingFunctions.verifyPassword = function(password, userId){
    
}