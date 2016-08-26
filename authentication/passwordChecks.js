/**
 * Created by ayoung on 19/08/16.
 */
var crypto = require('crypto');

const algorithm = 'aes-256-ecb';
const password = 'd6F3Efeq';


hashingFunctions = {};

hashingFunctions.encrypt = function(plain_text){
    var cipher = crypto.createCipher('aes-256-ecb', password);
    return cipher.update(plain_text, 'utf8', 'hex') + cipher.final('hex');
};

hashingFunctions.decrypt = function(cipher_text){
    try {
        cipher_text = cipher_text.replace('"','');
        var cipher = crypto.createDecipher('aes-256-ecb', password);
        console.log("CIPHER_TEXT : " + cipher_text);
        return cipher.update(cipher_text, 'hex', 'utf8') + cipher.final('utf8');
    }catch(err){
        console.log(err);
        done(err)
    }
};

hashingFunctions.verify = function(cipher_text, plain_text){
    var decryptText = hashingFunctions.decrypt(cipher_text);
    plain_text = plain_text.replace('"', '');
    return decryptText == plain_text;
}


module.exports = hashingFunctions;