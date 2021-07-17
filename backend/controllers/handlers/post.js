const User = require('../../models/index').user;
const Post = require('../../models/index').post;
const { sendEmail } = require('../../config/email.config');

const _postRequirement = async ({
  title,
  description,
  noOfHours,
  createdBy,
  domain,
  opening,
}) => {
  try {
    const updatedDescription = description.split('\n');
    const postDetails = {
      title,
      description: updatedDescription,
      noOfHours,
      createdBy,
      domain,
      opening,
    };
    const newPost = await Post.create(postDetails);
    const allVolunteers = await User.find({ role: 'Volunteer' });
    const filteredVolunteers = allVolunteers.filter((volunteer) => {
      return volunteer.areaOfInterest.includes(postDetails.domain);
    });
    const ngo = await User.findById(createdBy);
    const subject = `Updates from @TheSocialTeam`;
    const text = `Sir/Ma'am,
You are receiving this mail as part of being a Volunteer with The Social Town. This is to notify you of a new position of your interest is opened by ${ngo.name}. For more details regarding the same please check your profile

Regards,
The Social Town Team`;
    for (const volunteer of filteredVolunteers) {
      await sendEmail(volunteer.email, subject, text);
    }
    return newPost;
  } catch (error) {
    throw Boom.internal(error.message);
  }
};

const _getAllPosts = async () => {
  try {
    const allPosts = await Post.find({});
    return allPosts;
  } catch (error) {
    throw Boom.internal(error.message);
  }
};

const _updatePost = async ({ postId, volunteerId }) => {
  try {
    const foundPost = await Post.findById(postId);
    if (foundPost.appliedVolunteers.includes(volunteerId)) {
      const filteredVolunteers = foundPost.appliedVolunteers.filter((volId) => {
        return volId === volunteerId;
      });
      foundPost.appliedVolunteers = filteredVolunteers;
    } else {
      foundPost.appliedVolunteers.push(volunteerId);
    }
    foundPost.save();
    return foundPost;
  } catch (error) {
    throw Boom.internal(error.message);
  }
};

module.exports = {
  _postRequirement,
  _getAllPosts,
  _updatePost,
};
