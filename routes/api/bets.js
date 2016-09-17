/**
 * Created by ayoung on 31/08/16.
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
        if (checkValidBetMarket(betmarket)) {
            return res.status(422).json({
                success: false,
                data: format("bet type {} does not exist or in accepted bet type criteria", bettype)
            });
        }
        var sql = bet_sql[betmarket].getAll(req.user);
        conn.queryDB(sql)
            .then(function (data) {
                return res.json({
                    data: data.results,
                    success: true,
                    message: format("select bet from {} successful", betmarket)
                });
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        });


    })
    .post(function (req, res) {
        var betData = req.body;
        //Check bet market is
        var betmarket = req.query.betmarket;
        if (checkValidBetMarket(betmarket)) {
            return res.status(422).json({success: false, data: "invalid bet market selected in query param"});
        }
        //If bet case if falsey create new one for user else check it is assosiated to account
        if (!betData.betcaseid) {
            return createNewBetWithNewBetCase(betData);
        } else {
            return createNewBetUnderBetCase(betData, betData.betcaseid);
        }

        function createNewBetUnderBetCase(betCaseData, betCaseId) {
            if (betCaseId) {
                betCaseData.betcaseid = betCaseId;
            }
            var sql_event_case_check = format("SELECT * FROM betcase WHERE accountid={} AND id={}", req.user.accountid, betCaseData.betcaseid);
            conn.queryDB(sql_event_case_check)
                .then(function (data) {
                    if (data.results.length == 0) {
                        return res.status(422).json({
                            success: false,
                            data: "Invalid bet case selected for user account"
                        });
                    } else {
                        var add_bet_sql = bet_sql[betmarket].add(betCaseData);
                        conn.queryDB(add_bet_sql)
                            .then(function (data) {
                                return res.json({
                                    data: data.results,
                                    success: true,
                                    message: format("create bet for {} successful", betmarket)
                                });
                            }).catch(function (reason) {
                            console.log("SQL ERROR on insert bet");
                            return res.status(500).json({success: false, data: reason});
                        });
                    }
                })
                .catch(function (reason) {
                    return res.status(500).json({success: false, data: reason});
                });
        }

        function createNewBetWithNewBetCase(betData) {
            var betcaseSql = format("INSERT INTO betcase (accountid, sportid) VALUES({}, {}) RETURNING *", req.user.accountid, betData.sportid);
            conn.queryDB(betcaseSql)
                .then(function (betCaseData) {
                    return createNewBetUnderBetCase(betData, betCaseData.results[0].id);
                }).catch(function (reason) {
                console.log("Failed to create bet case");
                return res.status(500).json({success: false, data: reason});
            });
        }
    });

betRouter.route('/bet/:id')
    .get(generics.unprotected.getOne("abstract_bet")) //THIS NEEDS TO CHANGE TO SPECIFIC BET ONE
    .put(generics.user.update("abstract_bet"))
    .delete(function (req, res) {
        var betid = req.params.id;
        var betmarket = req.query.betmarket;
        //CHECK BET BELONGS TO ACCOUNT
        var check_bet_owner_sql = format("SELECT betcase.accountid as accountid, fb_absolute.id From fb_absolute, betcase WHERE fb_absolute.id={} AND betcaseid=betcase.id", betid);
        conn.queryDB(check_bet_owner_sql)
            .then(function (data) {
                if (data.results[0].accountid != req.user.accountid) {
                    return res.status(422).json({success: false, data: "Bet does not belong to user logged in"});
                }
                //DELETE BET
                var delete_bet_sql = format("DELETE FROM {} WHERE id={} RETURNING *",betmarket, betid);
                conn.queryDB(delete_bet_sql)
                    .then(function (data) {
                        return res.status(200).json({
                            data: data.results,
                            success: true,
                            message: format("delete bet from {} successful", betmarket)
                        });
                    }).catch(function (reason) {
                    return res.status(500).json({success: false, data: reason});
                });

            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        });
    });


betRouter.route('/bet/schema/:table_name')
    .get(function (req, res) {
        var table_name = req.params.table_name;
        var sql = format("SELECT array_to_json(string_to_array(string_agg(column_name, ', '),',')) as column_names\
        FROM INFORMATION_SCHEMA.COLUMNS\
        WHERE TABLE_NAME = N'{}'", table_name);
        conn.queryDB(sql)
            .then(function (data) {
                return res.json({
                    data: data.results,
                    success: true,
                    message: format("get bet data for {} successful", table_name)
                });
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        });
    });


function checkValidBetMarket(betMarket) {
    return !(['fb_absolute', 'fb_ht_ft_score', 'tennis_score'].indexOf(betMarket) > -1)

}

module.exports = betRouter;