const router = require('express').Router();
const Post = require('../models/post');

module.exports = function(routes){

  routes.get('/admin/posts', function(req, res) {
    Post.find({}, function(err, posts) {
      res.send(posts)
    })
    //console.log(res)
  });
  routes.post('/admin/posts', function(req, res) {
    var newPost = new Post ({
      title: req.body.title,
      content: req.body.content
    });
    newPost.save().then(function(err, result) {
      console.log('Post Created');
      console.log(newPost)
      res.send(newPost)
    });
  });
  routes.delete('/admin/posts', function(req, res) {
    Post.remove({"_id": req.body._id })
      .then(function(err, result) {
        console.log('Post Deleted');
        console.log(result)
        res.send(result)
      });

  });

  return routes;
}


