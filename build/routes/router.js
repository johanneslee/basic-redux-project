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

exports.default = router;