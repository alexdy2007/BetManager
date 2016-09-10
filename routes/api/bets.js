/**
 * Created by ayoung on 31/08/16.
 */

var express = require('express');
var betRouter = express.Router();
var conn = require('./../../db/queryDB');
var format = require('string-format');
var generics = require('./generics');

/* GET home page. */
betRouter.route('/bet/:id')
    .get(generics.getOne("abstract_bet"))
    .put(function(req, res) {
        return res.status(500).json({success: false, data: "NOT YET IMPLEMENTED"});
    });

betRouter.route('/bet/newcase')
    .post(function(req,res){
        var data = req.data;
        var sql = format("INSERT INTO accounts(accountid, sportid, status) values({}, {}, {}) RETURN *", data.accountid, data.sportid, data.status);
        conn.queryDB(sql)
            .then(function(results){
                return res.json(results);
            }).catch(function(reason){
            return res.status(500).json({ success: false, data: reason});
        });
    });


function newBetCase(){

}


module.exports = betRouter;