/**
 * Created by ayoung on 08/09/16.
 */
"use strict";
var express = require('express');
var betCaseRouter = express.Router();
var format = require('string-format');
var generics = require('./generics');

betCaseRouter.route('/betcase')
    .get(generics.user.getAll("betcase"))
    .post(generics.user.create("betcase"));

betCaseRouter.route('/betcase/:id')
    .get(generics.user.getOne("betcase"))
    .put(generics.user.update("betcase"))
    .delete(generics.user.delete("betcase"));

module.exports = betCaseRouter;
