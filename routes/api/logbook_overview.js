/**
 * Created by ayoung on 19/09/16.
 */





var express = require('express');
var logBookOverview = express.Router();
var format = require('string-format');
var generics = require('./generics');

logBookOverview.route('/logbookoverview')
    .get(generics.user.getAll('logbook_overview'));


logBookOverview.route('/logbookoverview/:id')
    .get(generics.user.getOne("logbook_overview"));

module.exports = logBookOverview;