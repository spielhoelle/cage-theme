/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(2);

module.exports = mongoose.model('User', {
  username: String,
  password: String,
  email: String,
  firstname: String,
  lastname: String
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(2);

module.exports = mongoose.model('Post', {
  title: String,
  content: String
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
module.exports = __webpack_require__(7);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0).config();
/**
 * Module dependencies.
 */

var app = __webpack_require__(8);
var debug = __webpack_require__(24)('cagetheme:server');
var http = __webpack_require__(25);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(1);
var path = __webpack_require__(9);
var favicon = __webpack_require__(10);
var logger = __webpack_require__(11);
var cookieParser = __webpack_require__(12);
var bodyParser = __webpack_require__(13);

__webpack_require__(0).config();
var dbConfig = __webpack_require__(14);
var mongoose = __webpack_require__(2);
// Connect to DB
mongoose.connect(dbConfig.url);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /src
app.use(favicon(path.join(__dirname, '../src', 'favicon.ico')));
app.use(logger('dev', {
  skip: function skip(req) {
    return req.path.match(/(woff2|css|js|)$/ig)[0] ? true : false;
  }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(__dirname + '../node_modules'));

// Configuring Passport
var passport = __webpack_require__(15);
var expressSession = __webpack_require__(16);
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
var flash = __webpack_require__(17);
app.use(flash());

// Initialize Passport
var initPassport = __webpack_require__(18);
initPassport(passport);

var routes = __webpack_require__(22)(passport);
var post_routes = __webpack_require__(23)(routes);
app.use('/', post_routes);
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

module.exports = app;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("static-favicon");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0).config();
module.exports = {
  'url': process.env.MONGOURL || 'mongodb://localhost/passport'
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("connect-flash");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var login = __webpack_require__(19);
var User = __webpack_require__(3);

module.exports = function (passport) {

  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  login(passport);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocalStrategy = __webpack_require__(20).Strategy;
var User = __webpack_require__(3);
var bCrypt = __webpack_require__(21);

module.exports = function (passport) {

  passport.use('login', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
  }, function (req, email, password, done) {
    // check in mongo if a user with username exists or not
    User.findOne({ 'email': email }, function (err, user) {
      // In case of any error, return using the done method
      if (err) return done(err);
      // Username does not exist, log the error and redirect back
      if (!user) {
        console.log('User Not Found with email ' + email);
        return done(null, false, req.flash('message', 'User Not found.'));
      }
      // User exists but wrong password, log the error 
      if (!isValidPassword(user, password)) {
        console.log('Invalid Password');
        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
      }
      // User and password both match, return user from done method
      // which will be treated like success
      return done(null, user);
    });
  }));

  var isValidPassword = function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
  };
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(1);
var router = express.Router();

var Post = __webpack_require__(4);

var isAuthenticated = function isAuthenticated(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated()) return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('login');
};

module.exports = function (passport) {

  /* GET login page. */
  router.get('/', function (req, res) {
    // Display the Login page with any flash message, if any
    Post.find({}, function (err, posts) {
      res.render('index', { posts: posts });
    });
  });
  router.get('/login', function (req, res) {
    if (req.user) {
      res.redirect('admin');
    } else {
      res.render('login', { message: req.flash('message') });
    }
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: 'admin',
    failureRedirect: 'login',
    failureFlash: true
  }));

  /* GET Admin Page */
  router.get('/admin', isAuthenticated, function (req, res) {
    res.render('dashboard', { user: req.user });
  });

  /* Handle Logout */
  router.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var router = __webpack_require__(1).Router();
var Post = __webpack_require__(4);

module.exports = function (routes) {

  routes.get('/admin/posts', function (req, res) {
    Post.find({}, function (err, posts) {
      res.send(posts);
    });
    //console.log(res)
  });
  routes.post('/admin/posts', function (req, res) {
    var newPost = new Post({
      title: req.body.title,
      content: req.body.content
    });
    newPost.save().then(function (err, result) {
      console.log('Post Created');
      console.log(newPost);
      res.send(newPost);
    });
  });
  routes.delete('/admin/posts', function (req, res) {
    Post.remove({ "_id": req.body._id }).then(function (err, result) {
      console.log('Post Deleted');
      console.log(result);
      res.send(result);
    });
  });

  return routes;
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ })
/******/ ]);