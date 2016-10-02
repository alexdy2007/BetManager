/**
 * Created by ayoung on 24/09/16.
 */


var express = require('express');
var bookieBookieAccountRouter = express.Router();
var conn = require('./../../../db/queryDB');
var format = require('string-format');
var generics = require('./../generics');


bookieBookieAccountRouter.route('/bookieandaccount')
    .get(function (req, res) {
        var sql = format("SELECT bookie.name, bookie_account.* FROM bookie, bookie_account WHERE bookie_account.accountid={} AND bookie_account.bookieid=bookie.id", req.user.accountid);
        conn.queryDB(sql)
            .then(function (data) {
                return res.json({
                    data: data.results,
                    success: true,
                    message: format("select bookie and bet for user {} successful", req.user.id)
                });
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        });
    });

module.exports = bookieBookieAccountRouter;