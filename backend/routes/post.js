const express = require('express');
const router = express.Router();

const {
  postRequirement,
  getAllPosts,
  updatePost,
} = require('../controllers/post.controller');

const authorize = require('../middleware/authorize');

router.post('/post-requirement', postRequirement);

router.get('/all-posts', authorize(['NGO','Volunteer']), getAllPosts);

router.put('/update-post', updatePost);

module.exports = router;
