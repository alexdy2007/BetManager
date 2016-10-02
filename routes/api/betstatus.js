/**
 * Created by ayoung on 24/09/16.
 */

var express = require('express');
var betStatusRouter= express.Router();
var format = require('string-format');
var generics = require('./generics');

betStatusRouter.route('/betstatus/:id')
    .get(generics.unprotected.getOne("bet_status"))
    .delete(generics.admin.delete("bet_status"))
    .put(generics.admin.update("bet_status"));

betStatusRouter.route('/betstatus')
    .get(generics.unprotected.getAll("bet_status"))
    .post(generics.admin.create("bet_status"));


module.exports = betStatusRouter;