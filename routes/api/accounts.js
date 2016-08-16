var express = require('express');
var accountsRouter = express.Router();
var conn = require('./connectToDB');

/* GET home page. */
accountsRouter.route('/accounts')
    .get(function(req, res) {
            var sql = "SELECT * FROM account";
            conn.queryDB(sql)
            .then(function(results){
                return res.json(results);
            }).catch(function(reason){
                return res.status(500).json({ success: false, data: reason});
            });
    });

module.exports = accountsRouter;
