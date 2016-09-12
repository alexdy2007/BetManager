/**
 * Created by ayoung on 31/08/16.
 */

var express = require('express');
var betRouter = express.Router();
var conn = require('./../../db/queryDB');
var format = require('string-format');
var generics = require('./generics');
var bet_sql = require('./../../db/sqlForBets');

/* GET home page. */
betRouter.route('/bet/:id')
    .get(generics.getOne("abstract_bet"))
    .put(function(req, res) {
        return res.status(500).json({success: false, data: "NOT YET IMPLEMENTED"});
    })
    .delete(function(req, res){
        var betid = req.params.id;
        
        //CHECK BET BELONGS TO ACCOUNT
        var check_bet_owner_sql = format("SELECT betcase.accountid, fb_absolute.id From fb_absolute, betcase WHERE fb_absolute.id={} AND betcaseid=betcase.id",betid);
        conn.queryDB(check_bet_owner_sql)
        .then(function(data){
            if(!data.results.accountid != req.user.accountid){
                return res.status(422).json({ success: false, data: "Bet does not belong to user logged in"});
            }
            //DELETE BET
            var delete_bet_sql = format("DELETE FROM fb_absolute WHERE id={} RETURNING *",betid);
            conn.queryDB(delete_bet_sql)
                .then(function(data){
                    return res.status(200).json(data);
                }).catch(function(reason){
                return res.status(500).json({ success: false, data: reason});
            });
            
        }).catch(function(reason){
            return res.status(500).json({ success: false, data: reason});
        });
    });

betRouter.route('/bet')
    .get(function(req, res){
        var betmarket = req.query.betmarket;
        if(checkValidBetMarket(betmarket)){
            return res.status(422).json({ success: false, data: format("bet type {} does not exist or in accepted bet type criteria",bettype)});
        }
        var sql = bet_sql[betmarket].getAll(req.user);
        conn.queryDB(sql)
            .then(function(results){
                return res.json(results);
            }).catch(function(reason){
            return res.status(500).json({ success: false, data: reason});
        });


    })
    .post(function(req, res){
        var betData = req.body;
        //Check bet market is
        var betmarket = req.query.betmarket;
        if(checkValidBetMarket(betmarket)){
            return res.status(422).json({ success: false, data: "invalid bet market selected in query param"});
        }
        //If bet case if falsey create new one for user else check it is assosiated to account
        if(!betData.betcaseid){
            return res.status(500).json({ success: false, data: "Code for adding event case not added"});
        }else{
            var sql_event_case_check = format("SELECT * FROM betcase WHERE accountid={} AND id={}", req.user.accountid, betData.betcaseid);
            conn.queryDB(sql_event_case_check)
                .then(function(data){
                    if(data.results.length == 0){
                        return res.status(422).json({ success: false, data: "Invalid bet case selected for user account"});
                    }else {
                        var add_bet_sql = bet_sql[betmarket].add(betData);
                        conn.queryDB(add_bet_sql)
                            .then(function (results) {
                                return res.json(results);
                            }).catch(function (reason) {
                                console.log("SQL ERROR on insert bet");
                                return res.status(500).json({success: false, data: reason});
                        });
                    }
                })
                .catch(function(reason){
                    return res.status(500).json({ success: false, data: reason});
                });
        }
    });


betRouter.route('/bet/schema/:table_name')
    .get(function(req,res){
        var table_name = req.params.table_name;
        var sql = format("SELECT array_to_json(string_to_array(string_agg(column_name, ', '),',')) as column_names\
        FROM INFORMATION_SCHEMA.COLUMNS\
        WHERE TABLE_NAME = N'{}'", table_name);
        conn.queryDB(sql)
            .then(function(results){
                return res.json(results);
            }).catch(function(reason){
            return res.status(500).json({ success: false, data: reason});
        });
    });


function checkValidBetMarket(betMarket){
    return !(['fb_absolute', 'fb_ht_ft_score', 'tennis_score'].indexOf(betMarket) > -1)

}

module.exports = betRouter;