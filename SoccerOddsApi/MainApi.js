/**
 * Created by ayoung on 01/10/16.
 */

var request = require('request');


var options = {
    url: "https://arisalexis-soccer-odds-v1.p.mashape.com/upcoming?name=Australia A League",
    headers: {
        'User-Agent': 'request',
        "X-Mashape-Key": "IDY6AZoF0jmshIAqCjFEkiagGZknp19tvs5jsnz5SDkZkUaKaI",
        "Accept": "application/json"
    }
};

const key = "Js6GGSo2GpmshSpUc4XpYfzPYRnCp188427jsntgVEGaCBlTn";


function getLeagues(){

}


function SoccarApiCallback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info);
    }
}

request(options, SoccarApiCallback);
