var express = require('express');
var accountsRouter = express.Router();
var conn = require('./../../db/queryDB');
var format = require('string-format');

/* GET home page. */
accountsRouter.route('/accounts')
    .get(function(req, res) {
            var sql = "SELECT * FROM account";
            conn.queryDB(sql)
            .then(function(results){
                console.log(results.results);
                return res.json(results.results);
            }).catch(function(reason){
                return res.status(500).json({ success: false, data: reason});
            });
    })
    .post(function(req, res) {
        var data = {text: req.body.text, complete: false};
        sql = "INSERT INTO accounts(expirydates, userid, accounttypeid values({}, {}, {}) RETURN *"
            .format([data.exirydates, data.userid, accounttypeid]);
        conn.queryDB(sql)
            .then(function (results) {
                console.log(results.results);
                return res.json(results.results);
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        });
    });

accountsRouter.route('/accounts/:account_id')
    .get(function(req,res) {
        var id = req.params.account_id;
        var sql = "SELECT * FROM account WHERE account.id = " + id;
        conn.queryDB(sql)
            .then(function (results) {
                console.log(results);
                return res.json(results.results);
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        })
    })
    .put(function(req,res){
        var id = req.params.account_id;
        return res.status(503)
    })
    .delete(function(req,res){
        var id = req.params.account_id;
        var sql = "DELETE FROM account WHERE id=" + id + "RETURN *";
        conn.queryDB(sql)
            .then(function (results) {
                console.log(results);
                return res.json(results.results);
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        })
    });






module.exports = accountsRouter;
