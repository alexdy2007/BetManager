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
        var betmarket;
        if(req.query.betmarket){
             betmarket = req.query.betmarket;
        }else{
             betmarket = null;
        }
        var sql = bet_sql["bet"].getAll(req.user, betmarket);
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
                        var add_bet_sql = bet_sql["bet"].add(betCaseData);
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
    .get(generics.unprotected.getOne("bet"))  //NEEDS CHANGING TO BE SPECIFIC TO CHECK BET BELONGS TO ACCOUNT
    .put(generics.user.update("bet"))
    .delete(function (req, res) {
        var betid = req.params.id;
        //CHECK BET BELONGS TO ACCOUNT
        var check_bet_owner_sql = format("SELECT betcase.accountid as accountid, bet.id FROM bet, betcase WHERE bet.id={} AND bet.betcaseid=betcase.id", betid);
        conn.queryDB(check_bet_owner_sql)
            .then(function (data) {
                if (data.results[0].accountid != req.user.accountid) {
                    return res.status(422).json({success: false, data: "Bet does not belong to user logged in"});
                }
                //DELETE BET
                var delete_bet_sql = format("DELETE FROM bet WHERE id={} RETURNING *", betid);
                conn.queryDB(delete_bet_sql)
                    .then(function (data) {
                        return res.status(200).json({
                            data: data.results,
                            success: true,
                            message: format("delete betwith id: {} successful", betid)
                        });
                    }).catch(function (reason) {
                    return res.status(500).json({success: false, data: reason});
                });

            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        });
    });


module.exports = betRouter;