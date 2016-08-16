/**
 * Created by ayoung on 09/08/16.
 */
var express = require('express');
var path = require("path");
var router = express.Router();

/* GET home page. */
router.get('/createBets', function (req, res, next) {
    try {
        tableCreationScripts.createBetCase();
        res.send("sucessfully created table");
    }catch(err){
        res.send("error" + err.message, 200);
    }
});

module.exports = router;
