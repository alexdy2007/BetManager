/**
 * Created by ayoung on 15/09/16.
 */
/**
 * Created by ayoung on 08/09/16.
 */
"use strict";
var express = require('express');
var bookieAccountRouter = express.Router();
var format = require('string-format');
var generics = require('./generics');

bookieAccountRouter.route('/bookieaccount')
    .get(generics.user.getAll("bookie_account"))
    .post(generics.user.create("bookie_account"));

bookieAccountRouter.route('/bookieaccount/:id')
    .get(generics.user.getOne("bookie_account"))
    .put(generics.user.update("bookie_account"))
    .delete(generics.user.delete("bookie_account"));

module.exports = bookieAccountRouter;
