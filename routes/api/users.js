/**
 * Created by ayoung on 19/08/16.
 */
var express = require('express');
var userRouter = express.Router();
var conn = require('./../../db/queryDB');
var format = require('string-format');


/* GET home page. */
userRouter.route('/users')
    .get(function(req, res) {
        var sql = "SELECT * FROM user";
        conn.queryDB(sql)
            .then(function(results){
                return res.json(results);
            }).catch(function(reason){
            return res.status(500).json({ success: false, data: reason});
        });
    })
    .post(function(req, res) {
        var data = {text: req.body.text, complete: false};
        var 
        sql = "INSERT INTO users(first_name, last_name, username, password values({}, {}, {}, {}) RETURN *"
            .format([data.first_name, data.last_name, username]);
        conn.queryDB(sql)
            .then(function (err, results) {
                console.log(results);
                return res.json(results);
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        });
    });

accountsRouter.route('/accounts/:account_id')
    .get(function(req,res) {
        var id = req.params.account_id;
        var sql = "SELECT * FROM account WHERE account.id = " + id;
        conn.queryDB(sql)
            .then(function (err, results) {
                console.log(results);
                return res.json(results);
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
        var sql = "DELETE FROM account WHERE id=" + id;
        console.log(sql);
        conn.queryDB(sql)
            .then(function (err, results) {
                console.log(results);
                return res.json(results);
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        })
    });






module.exports = accountsRouter;