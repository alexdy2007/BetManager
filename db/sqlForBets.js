/**
 * Created by ayoung on 11/09/16.
 */

var format = require('string-format');

BETSQL = {

    bet: {
        add: function (bet_fb_absolute) {
            var bet_specific_data = {data:JSON.stringify(bet_fb_absolute.bet_specific)};
            var sql = format("INSERT INTO bet \
            (bookieaccountid, betcaseid, stake, odds, betmarketid, commission, laybet, datetime, betstatusid, bettypeid, bet_specific)\
            VALUES ({0.bookieaccountid}, {0.betcaseid}, {0.stake}, {0.odds}, {0.betmarketid}, {0.commission}, {0.laybet}, '{0.datetime}','{0.betstatusid}', {0.bettypeid}, '{1.data}')\
            RETURNING *"
                , bet_fb_absolute, bet_specific_data);
            return sql;
        },
        getAll: function (user, betMarket) {
            var betmarketFilter = "";
            if(betMarket){
                betmarketFilter = format("AND bet_specific->'betmarket'?'{}'",betMarket)
            }
            var sql = format("SELECT betcase.id as bet_case_id, bet.*\
            FROM bet\
            LEFT JOIN betcase ON bet.betcaseid = betcase.id\
            WHERE betcase.accountid = {}\
            {}", user.accountid, betmarketFilter);
            return sql;
        },
        update: function () {
            throw new Error("Not yet implcated");
        }
    }
}

module.exports = BETSQL;

