var express = require('express');
var accountsRouter = express.Router();
var conn = require('./../../db/queryDB');
var format = require('string-format');
var generics = require('./generics');

accountsRouter.route('/accounts')
    .get(generics.getAll("account"))
    .post(generics.create("account"));

accountsRouter.route('/accounts/:id')
    .get(generics.getOne("account"))
    .put(function(req,res){
        var id = req.params.account_id;
        return res.status(503)
    })
    .delete(generics.delete("account"));

module.exports = accountsRouter;
