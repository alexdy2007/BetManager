/**
 * Created by ayoung on 15/08/16.
 */
var express = require('express');
var path = require("path");
var passport = require("passport")
    , LocalStrategy = require('passport-local').Strategy
    , RememberMeStrategy = require('passport-remember-me').Strategy;
var conn = require('./../db/queryDB');
var cookieStore = require('./../authentication/cookieStore');
var format = require('string-format');

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        conn.queryDB(format("select users.id as id, users.email, account.id as accountid from users\
        LEFT JOIN account\
        ON users.id=account.userid\
        WHERE users.id={}",id)).then(function (data) {
            if(data.err){
                return done(err);
            }
            return done(null, data.results[0]);
        });
    });


    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            conn.query("select * from users where email = '" + email + "'").then(function (data) {
                if (data.err)
                    return done(data.err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {

                    // if there is no user with that email
                    // create the user
                    var userSqlObject = new Object();

                    userSqlObject.email = email;
                    userSqlObject.password = password; // use the generateHash function in our user model

                    var insertQuery = "INSERT INTO users ( email, password ) values (" + email + ',' + password + ') RETURN *';
                    conn.queryDB(insertQuery).then(function (data2) {
                        userSqlObject.id = data2.results.id;
                        return done(null, userSqlObject);
                    });
                }
            });
        }));


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session:true// allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {

            conn.queryDB("SELECT * FROM users WHERE email='" + email + "'").then(function (data) {
                if (data.error) {
                    return done(data.error);
                }
                if (!data.results.length) {
                    return done(null, false); // req.flash is the way to set flashdata using connect-flash
                }
                // if the user is found but the password is wrong

                if (!( data.results[0].password == password)) {
                    return done(null, false); // create the loginMessage and save it to session as flashdata
                }
                // all is well, return successful user;
                return done(null, data.results[0]);

            });


        }));

    passport.use(new RememberMeStrategy(

        function (token, done) {
            cookieStore.getToken(token, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                var sql_find_user = "SELECT * FROM users WHERE id=" + user[0].id;
                conn.queryDB(sql_find_user).then(function(data){
                    return done(null, data.results[0]);
                });
            });
        },
        function (user, done) {
            var Token = cookieStore.generateCookie();
            cookieStore.saveToken(user, Token, function(err, token){
                if(err){
                    done(null, false)
                }
                return done(null, token.cookiehash);
            })

        })
    );

};