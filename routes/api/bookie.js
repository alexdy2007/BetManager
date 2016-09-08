/**
 * Created by ayoung on 08/09/16.
 */

var express = require('express');
var bookieRouter = express.Router();
var format = require('string-format');
var generics = require('./generics');

bookieRouter.route('/bookie/:id')
    .get(generics.getOne("bookie"))
    .delete(generics.delete("bookie"))
    .put(function(req, res) {
        return res.status(500).json({success: false, data: "NOT YET IMPLEMENTED"});
    });

bookieRouter.route('/bookie')
    .get(generics.getAll("bookie"))
    .post(generics.create("bookie"));


module.exports = bookieRouter;