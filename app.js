
var path = require('path');
var flash = require('connect-flash');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var express = require('express');

var session = require('express-session');
var passport = require('passport');

var app = express();


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var sessionOpts = {
    saveUninitialized: true, // saved new sessions
    resave: false, // do not automatically write to the session store
    secret: 'keyboardcat',
    cookie : { maxAge: 2419200000 } // configure when sessions expires
};

require('./authentication/passport')(passport);
app.use(session(sessionOpts));
app.use(passport.initialize());
app.use(passport.session());


var routes = require('./routes/index');

//API ROUTES
var accountsRouter = require('./routes/api/accounts');
var loginRouter = require('./routes/api/auth')(passport);
var betRouter = require('./routes/api/bets');
var bookieRouter = require('./routes/api/bookie');
var betCaseRouter = require('./routes/api/betcase');
var bookieAccountOverviewRouter = require('./routes/api/bookie_account_overview');
var bookieAccountRouter = require('./routes/api/bookieaccount');



app.use(express.static(path.join(__dirname, 'public')));





//NORMAL ROUTES
app.use('/', routes);
app.use('/homepage', routes);

//AUTH ROUTES
app.use('/auth', loginRouter);

//API ROUTES
app.use('/api', [accountsRouter, betRouter, bookieRouter, betCaseRouter, bookieAccountRouter, bookieAccountOverviewRouter]);




if(app.get('env') != 'test') {
    app.use(logger('dev'));
}


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
