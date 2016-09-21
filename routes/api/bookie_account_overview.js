/**
 * Created by ayoung on 17/09/16.
 */
/**
 * Created by ayoung on 08/09/16.
 */
"use strict";
var express = require('express');
var bookieAccountOverviewRouter = express.Router();
var generics = require('./generics');

bookieAccountOverviewRouter.route('/bookieaccountoverview')
    .get(generics.user.getAll("bookie_account_overview"));


module.exports = bookieAccountOverviewRouter;