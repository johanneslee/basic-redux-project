import express from 'express';
import models from '../models';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('posts');
});

router.get('/read/:id', (req, res) => {
  res.send('You\'re reading a post ' + req.params.id);
});

router.get('/posts', (req, res, next) => {
  models.post.findAll().then((posts) => {
    return res.status(200).json(posts);
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: 'Could not retrieve posts'
    });
  });
});

router.get('/posts/:id', function(req, res, next) {
  models.post.findOne({ where: {id: req.params.id} }).then((post) => {
    if (!post) {
      return res.status(404).json({
        message: 'Post not found'
      });
    }
    res.json(post);
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: 'Could not retrieve post w/ that id'
    });
  });
});

export default router;
