/**
 * Created by ayoung on 16/08/16.
 */

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/databaseConfig.js')[env];
var pg = require('pg');
var Promise = require('promise');

var config = {
    user: 'ayoung', //env var: PGUSER
    database: config.database.db,
    password: 'Popcorn10',
    port: config.database.port,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

exports.queryDB = Promise.nodeify(connectionToDB);

function connectionToDB(sql){
    var pool = new pg.Pool(config);
    return new Promise(function(resolve, reject){
        var results = [];
        try {
            pool.connect(function (err, client, done) {
                query = client.query(sql);
                // Stream results back one row at a time
                query.on('row', function (row) {
                    results.push(row);
                });
                query.on('end', function () {
                    done();
                    resolve(results);
                });
            })
        } catch (err) {
            done();
            reject(err)
        }
    });

}