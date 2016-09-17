
"use strict";
var express = require('express');
var path = require("path");
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(path.join(__dirname + 'index'));
    res.render('index.jade')
});


module.exports = router;
