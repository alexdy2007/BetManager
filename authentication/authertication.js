/**
 * Created by ayoung on 15/08/16.
 */
var express = require('express');
var path = require("path");
var passport = require("passport")
    ,LocalStrategy = require('passport-local').Strategy;
var conn = require('./../db/queryDB');

var LocalStrategy   = require('passport-local').Strategy;


// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("select * from users where id = "+id,function(err,rows){
            done(err, rows[0]);
        });
    });


    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            conn.query("select * from users where email = '"+email+"'").then(function(data){
                console.log(data);
                console.log("above row object");
                if (data.err)
                    return done(data.err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {

                    // if there is no user with that email
                    // create the user
                    var userSqlObject = new Object();

                    userSqlObject.email    = email;
                    userSqlObject.password = password; // use the generateHash function in our user model

                    var insertQuery = "INSERT INTO users ( email, password ) values (" + email + ',' + password +') RETURN *';
                    console.log(insertQuery);
                    conn.queryDB(insertQuery).then(function(data2){
                        userSqlObject.id = data2.results.id;
                        return done(null, userSqlObject);
                    });
                }
            });
        }));

    
    /////////CARRY ON GOT TO HERE 19th;
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            conn.queryDB("SELECT * FROM users WHERE email =" + email).then(function(data){
                if (data.err)
                    return done(err);
                if (!data.results.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!( rows[0].password == password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);

            });



        }));

};