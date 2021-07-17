const User = require('../../models/index').user;
const EnrolledVolunteer = require('../../models/index').enrolledVolunteer;

const _getUserById = async ({
  id
}) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    next(error);
  }
};

const _getAllUsers = async () => {
  try {
    const allUsers = await User.find({});
    return allUsers;
  } catch (error) {
    next(error);
  }
};

const _getAllEnrolledVolunteers = async ({
  corporateId
}) => {
  try {
    let volunteers = [];
    const allEnrolledVolunteers = await EnrolledVolunteer.find({
      corporateId
    });
    for (const enrolledVolunteer of allEnrolledVolunteers) {
      const volunteer = await User.findById(enrolledVolunteer.volunteerId);
      volunteers.push(volunteer);
    }
    return volunteers;
  } catch (error) {
    next(error);
  }
};

const _getEnrolledVolunteers = async()=>{
  try{
    let allEnrolledVolunteers = await EnrolledVolunteer.find({})
    return allEnrolledVolunteers
  }catch (error) {
    next(error);
  }
}

const _updateVolunteer = async ({
  volunteerId,
  points
}) => {
  try {
    const foundVolunteer = await User.findById(volunteerId);
    console.log("found volunteer")
    console.log(foundVolunteer)
    foundVolunteer.points += points;
    foundVolunteer.save();
    return foundVolunteer;

  } catch (error) {
    next(error);
  }
}

module.exports = {
  _getUserById,
  _getAllUsers,
  _getAllEnrolledVolunteers,
  _updateVolunteer,
  _getEnrolledVolunteers
};