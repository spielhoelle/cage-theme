var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('dotenv').config()
var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /src
app.use(favicon(path.join(__dirname, '../src', 'favicon.ico')));
app.use(logger('dev', {
  skip(req) {
    return req.path.match(/(woff2|css|js|)$/ig)[0] ? true : false
  }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(__dirname + '../node_modules'));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({
  secret: "cookie_secret",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./routes/auth/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
var post_routes = require('./routes/posts')(routes);
app.use('/', post_routes );
app.use('/',  routes );

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

module.exports = app;
