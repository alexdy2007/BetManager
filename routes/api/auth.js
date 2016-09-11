/**
 * Created by ayoung on 20/08/16.
 */
var express = require('express');
var loginRouter = express.Router();
var cookieStore = require('../../authentication/cookieStore');
var hashing = require('../../authentication/passwordChecks');
const util = require('util');
var conn = require('./../../db/queryDB');
var format = require('string-format');

module.exports = function(passport) {
    
    loginRouter.post('/login',
        passport.authenticate('local-login'),
        function(req, res, next) {
            var token = cookieStore.generateCookie();
            var cookie = cookieStore.saveToken(req.user.id, token, function (err, response) {
                if (err) {
                    console.log("unable to save cookie");
                    return res.status(500).json({success: false, data: reason, msg: "unable to save session cookie"});
                }
                res.cookie('remember_me', token, {path: '/', id: req.user.id, httpOnly: true, maxAge: 604800000}); // 7 days
                return res.status(200).send({"success":true, msg:"log on success"});
            });

    });

    loginRouter.get('/login',  passport.authenticate('local-login'),
        function(req, res, next) {
            var token = cookieStore.generateCookie();
            var cookie = cookieStore.saveToken(req.user.id, token, function (err, response) {
                if (err) {
                    console.log("unable to save cookie");
                    return res.status(500).json({success: false, data: reason, msg: "unable to save session cookie"});
                }
                res.cookie('remember_me', token, {path: '/', id: req.user.id, httpOnly: true, maxAge: 604800000}); // 7 days
                return res.status(200).send({"success": true, msg: "log on success"});
            });

        });


    loginRouter.post('/auth', function(req, res) {
        console.log("auth hit");
        var token = req.cookies.remember_me;
        console.log("TOKEN : "  + token);
        cookieStore.getToken(token, function(err, response){
            console.log(err);
            if(err){
                return res.status(403).json({ success: false, data: err, msg:"unable to find session cookie"});
            }
            if (!req.user){
                var user = {};
                user.id = response[0].id;
                req.login(user, function(err){
                    return res.status(500).json({success: false, data: err});
                });
                return res.status(200).json({"success": true, "msg": "login successful"})
            }else {
                return res.status(200).json({"success": true, "msg": "login successful"})
            }
        });


    });

    loginRouter.post('/logout', function(req, res) {
        var token = req.cookies.remember_me;
        cookieStore.removeToken(token, function(err, response){
            if(err){
                res.status(403).json({ success: false, data: response, msg:"unable to logout"});
            }
            return done(response)
        });
        res.logout();
        return res.status(200).json({"success":true , "msg":"logout successful"})

    });


    return loginRouter;
};


//     /* GET Registration Page */
//     router.get('/signup', function(req, res){
//         res.render('register',{message: req.flash('message')});
//     });
//
//     /* Handle Registration POST */
//     router.post('/signup', passport.authenticate('signup', {
//         successRedirect: '/home',
//         failureRedirect: '/signup',
//         failureFlash : true
//     }));
//
//     return router;
// }

