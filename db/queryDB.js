/**
 * Created by ayoung on 16/08/16.
 */

var env = process.env.NODE_ENV || 'development';
var config = require('../config/databaseConfig.js')[env];
var pg = require('pg');
var Promise = require('promise');

var customConfig = {
	user: 'docker',
	database: 'docker',
	password: process.env.PGPASSWORD,
	host: process.env.DB_PORT_5432_TCP_ADDR,
	port: process.env.DB_PORT_5432_TCP_PORT,
	max: 10,
	idleTimeoutMillis: 30000,
};

exports.queryDB = Promise.nodeify(connectionToDB);

const pool = new pg.Pool(customConfig);

function connectionToDB(sql) {

	return new Promise(function(resolve, reject) {
		var results = [];
		try {
			pool.connect(function(err, client, done) {
				query = client.query(sql);
				// Stream results back one row at a time
				query.on('row', function(row) {
					if (row != "" | row != " ") {
						results.push(row);
					}
				});
				query.on('end', function() {
					done();
					toReturn = {};
					toReturn.error = null;
					toReturn.results = results;
					resolve(toReturn);
				});
			})
		} catch (err) {
			console.log("SQL ERROR" + err);
			done();
			reject({
				'data': null,
				'error': err
			})
		}
	});

}
