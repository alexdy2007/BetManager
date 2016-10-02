/**
 * Created by ayoung on 23/09/16.
 */

"use strict";
var express = require('express');
var betMarketRouter = express.Router();
var generics = require('./generics');

betMarketRouter.route('/betmarket/:id')
    .get(generics.unprotected.getOne("bet_market"))
    .delete(generics.admin.delete("bet_market"))
    .put(generics.admin.update("bet_market"));

betMarketRouter.route('/betmarket')
    .get(generics.unprotected.getAll("bet_market"))
    .post(generics.admin.create("bet_market"));


module.exports = betMarketRouter;