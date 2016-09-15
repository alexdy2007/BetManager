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
    .get(generics.getAllUserSpecific("bookieaccount"))
    .post(generics.create("bookieaccount"));

bookieAccountRouter.route('/bookieaccount/:id')
    .get(generics.getOneUserSpecific("bookieaccount"))
    .put(generics.update("bookieaccount"))
    .delete(generics.delete("bookieaccount"));

module.exports = bookieAccountRouter;
