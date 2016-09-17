var express = require('express');
var accountsRouter = express.Router();
var conn = require('./../../db/queryDB');
var format = require('string-format');
var generics = require('./generics');

accountsRouter.route('/accounts')
    .get(generics.unprotected.getAll("account"))
    .post(generics.user.create("account"));

accountsRouter.route('/accounts/:id')
    .get(generics.unprotected.getOne("account"))
    .put(generics.user.update("account"))
    .delete(generics.user.delete("account"));

module.exports = accountsRouter;
