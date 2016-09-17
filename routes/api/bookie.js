/**
 * Created by ayoung on 08/09/16.
 */
"use strict";
var express = require('express');
var bookieRouter = express.Router();
var format = require('string-format');
var generics = require('./generics');

bookieRouter.route('/bookie/:id')
    .get(generics.unprotected.getOne("bookie"))
    .delete(generics.admin.delete("bookie"))
    .put(generics.admin.update("bookie"));

bookieRouter.route('/bookie')
    .get(generics.unprotected.getAll("bookie"))
    .post(generics.admin.create("bookie"));


module.exports = bookieRouter;