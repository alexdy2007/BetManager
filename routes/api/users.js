/**
 * Created by ayoung on 19/08/16.
 */
var express = require('express');
var userRouter = express.Router();
var conn = require('./../../db/queryDB');
var format = require('string-format');
var generics = require('./generics');




/* GET home page. */
userRouter.route('/users')
    .get(generics.getAll('users'))
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







module.exports = accountsRouter;