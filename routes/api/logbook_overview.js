/**
 * Created by ayoung on 19/09/16.
 */





var express = require('express');
var betRouter = express.Router();
var conn = require('./../../db/queryDB');
var format = require('string-format');
var generics = require('./generics');
var bet_sql = require('./../../db/sqlForBets');

betRouter.route('/bet')
    .get(function (req, res) {
        var betmarket = req.query.betmarket;
        var betcaseid = req.query.betcaseid;
        if (checkValidBetMarket(betmarket)) {
            return res.status(422).json({
                success: false,
                data: format("bet type {} does not exist or in accepted bet type criteria", bettype)
            });
        }
        var sql = format("SELECT bookie.name as bookieName, {0}.*\
                    FROM {0}, bookie_account, bookie, betcase\
                    WHERE {0}.betcaseid={1}\
                    AND {0}.bookieaccountid=bookie_account.id\
                    AND bookie_account.bookieid = bookie.id\
                    AND {0}.betcaseid=betcase.id\
                    AND betcase.accountid={2};", betmarket, betcaseid, req.user.accountid);
        conn.queryDB(sql)
            .then(function (data) {
                return res.json({
                    data: data.results,
                    success: true,
                    message: format("select logbook from {} successful", betmarket)
                });
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        });
    });