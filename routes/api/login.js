/**
 * Created by ayoung on 20/08/16.
 */
var express = require('express');
var loginRouter = express.Router();
var passport = require('passport');

loginRouter.post('/login',
    passport.authenticate('local', {
        successRedirect: '/homepage',
        failureRedirect: '/login',
        failureFlash: true
    })
);

module.exports = loginRouter;