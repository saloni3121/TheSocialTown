const {
  _postRequirement,
  _getAllPosts,
  _updatePost,
} = require('./handlers/post');

const postRequirement = async (req, res, next) => {
  try {
    const user = await _postRequirement({ ...req.body });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const allPosts = await _getAllPosts();
    return res.status(200).json(allPosts);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await _updatePost({ ...req.body });
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postRequirement,
  getAllPosts,
  updatePost,
};
