/**
 * Created by ayoung on 20/08/16.
 */
var express = require('express');
var loginRouter = express.Router();
var hashing = require('../../authentication/passwordChecks');
const util = require('util');

module.exports = function(passport) {

    console.log("HERE IN LOGIN");

    loginRouter.post('/login',
        passport.authenticate('local-login'),
        function(req, res) {
            console.log(req.user.email);
            var cookieHash = hashing.encrypt(req.user.email);
            console.log(cookieHash);
            return res.status(200).send({"success":true, "randomString": req.user.email + '-' + cookieHash});
        }
    );


    loginRouter.post('/auth', function(req, res) {
        if(req.body.randomString !== undefined) {
            var hashUser = req.body.randomString;
            console.log("hashuser : " + hashUser.split('-')[1] + ":" +  hashUser.split('-')[0]);
            if (hashing.verify(hashUser.split('-')[1], hashUser.split('-')[0])) {
                return res.status(200).send({success: true, msg: 'Authentication passed'});
            };
        }
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});


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

