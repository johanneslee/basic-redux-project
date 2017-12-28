'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  res.send('posts');
});

router.get('/read/:id', function (req, res) {
  res.send('You\'re reading a post ' + req.params.id);
});

router.get('/posts', function (req, res, next) {
  _models2.default.post.findAll().then(function (posts) {
    return res.status(200).json(posts);
  }).catch(function (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Could not retrieve posts'
    });
  });
});

router.post('/posts', function (req, res, next) {
  var body = req.body;
  var title = body.title;
  var categories = body.categories;
  var content = body.content;

  if (!title || !categories || !content) {
    return res.status(400).json({
      message: 'Error title, categories and content are all required!'
    });
  }

  _models2.default.post.create({
    title: title,
    categories: categories,
    content: content
  }).then(function (post) {
    res.json(post);
  }).catch(function (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Could not save post'
    });
  });
});

router.get('/posts/:id', function (req, res, next) {
  _models2.default.post.findOne({ where: { id: req.params.id } }).then(function (post) {
    if (!post) {
      return res.status(404).json({
        message: 'Post not found'
      });
    }
    res.json(post);
  }).catch(function (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Could not retrieve post w/ that id'
    });
  });
});

router.delete('/posts/:id', function (req, res, next) {
  var id = req.params.id;

  _models2.default.post.destroy({ where: { id: req.params.id } }).then(function () {
    _models2.default.post.findOne({ where: { id: req.params.id } }).then(function (post) {
      if (!post) {
        return res.json({
          result: 'Post was deleted'
        });
      } else {
        return res.status(500).json({
          message: 'Could not retrieve delete w/ that id'
        });
      }
    }).catch(function (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not retrieve delete w/ that id'
      });
    });
  }).catch(function (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Could not retrieve delete w/ that id'
    });
  });
});

router.post('/posts/validate/fields', function (req, res, next) {
  var body = req.body;
  var title = body.title ? body.title.trim() : '';

  console.log("title: " + title);

  _models2.default.post.findOne({ where: { title: title } }).then(function (post) {
    console.log(post);
    if (post) {
      return res.status(200).json({
        title: 'Title "' + title + '" is not unique!'
      });
    } else {
      return res.status(200).json({});
    }
  }).catch(function (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Could not find post for title uniqueness'
    });
  });
});

exports.default = router;