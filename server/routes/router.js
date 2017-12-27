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

router.post('/posts', function(req, res, next) {
  var body = req.body;
  var title = body.title;
  var categories = body.categories;
  var content = body.content;

  if (!title || !categories || !content) {
    return res.status(400).json({
      message: 'Error title, categories and content are all required!'
    });
  }

  models.post.create({
    title: title,
    categories: categories,
    content: content
  })
  .then((post) => {
    res.json(post);
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: 'Could not save post'
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

/*
router.delete('/posts/:id', function(req, res, next) {
  var id = req.params.id;
  if (id.length != 24) {
    return res.json({
      message: 'id must be a valid 24 char hex string'
    });
  }

  var id = mongoose.Types.ObjectId(req.params.id); //convert to objectid
  Post.findByIdAndRemove(id, function(err, post) {
    if (err)
      throw err;

    if (!post) {
      return res.status(404).json({
        message: 'Could not delete post'
      });
    }

    res.json({
      result: 'Post was deleted'
    });

  });
});
*/

router.post('/posts/validate/fields', function(req, res, next) {
  let body = req.body;
  let title = body.title ? body.title.trim() : '';

  console.log("title: " + title);

  models.post.findOne({ where : { title: title } }).then((post) => {
    console.log(post);
    if(post) {
      return res.status(200).json({
        title: 'Title "' + title + '" is not unique!'
      });
    }
    else {
      return res.status(200).json({});
    }
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: 'Could not find post for title uniqueness'
    });
  });
});

export default router;
