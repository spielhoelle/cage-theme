var express = require('express');
var router = express.Router();

const Post = require('../models/post');

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('login');
}

module.exports = function(passport){

  /* GET login page. */
  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    Post.find({}, function(err, posts) {
      res.render('index', { posts: posts });
    })
  });
  router.get('/login', function(req, res) {
    if (req.user) {
      res.redirect('admin');
    }else{
      res.render('login', { message: req.flash('message') });
    }
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: 'admin',
    failureRedirect: 'login',
    failureFlash : true  
  }));

  /* GET Admin Page */
  router.get('/admin', isAuthenticated, function(req, res){
    res.render('dashboard', { user: req.user });
  });

  /* Handle Logout */
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
}


