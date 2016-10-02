/**
 * Created by ayoung on 24/09/16.
 */

var express = require('express');
var betTypeRouter= express.Router();
var format = require('string-format');
var generics = require('./generics');

betTypeRouter.route('/bettype/:id')
    .get(generics.unprotected.getOne("bet_type"))
    .delete(generics.admin.delete("bet_type"))
    .put(generics.admin.update("bet_type"));

betTypeRouter.route('/bettype')
    .get(generics.unprotected.getAll("bet_type"))
    .post(generics.admin.create("bet_type"));


module.exports = betTypeRouter;