/**
 * Created by ayoung on 11/09/16.
 */

var format = require('string-format');

BETSQL = {

    fb_absolute:{
        add : function(bet_fb_absolute){
            var sql = format ("INSERT INTO fb_absolute \
            (bookieaccountid, betcaseid, stake, odds, sportid, commission, laybet, datetime, hometeam, awayteam, hometeamselected, resulttypeid, bettypeid)\
            VALUES ({0.bookieaccountid}, {0.betcaseid}, {0.stake}, {0.odds}, {0.sportid}, {0.commission}, {0.laybet}, '{0.datetime}', '{0.hometeam}', '{0.awayteam}', '{0.hometeamselected}', {0.resulttypeid}, {0.bettypeid})\
            RETURNING *"
            ,bet_fb_absolute);
            return sql;
        },
        getAll : function(user) {
            var sql = format("SELECT betcase.id as bet_case_id, fb_absolute.*\
            FROM fb_absolute\
            LEFT JOIN betcase ON fb_absolute.betcaseid = betcase.id\
            WHERE betcase.accountid = {}", user.accountid);
            return sql;
        },
        update: function(){throw new Error("Not yet implcated");}
    },
    abstract_fb:{
        add : function(){throw new Error("Can't be done on table abstract_fb")},
        getAll : function(user){
            var sql = format("SELECT betcase.id as bet_case_id, abstract_fb.*\
            FROM abstract_fb\
            LEFT JOIN betcase ON abstract_fb.betcaseid = betcase.id\
            WHERE betcase.accountid = {}", user.accountid);
            return sql;
        }
    },
    abstract_bet:{
        add : function(){throw new Error("Can't be done on table abstract_bet")},
        getAll : function(user){
            var sql = format("SELECT betcase.id as bet_case_id, abstract_bet.*\
            FROM abstract_bet\
            LEFT JOIN betcase ON abstract_bet.betcaseid = betcase.id\
            WHERE betcase.accountid = {}", user.accountid);
            return sql;
        }
    }
}

module.exports = BETSQL;

