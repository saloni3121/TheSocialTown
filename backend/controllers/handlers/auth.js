const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const User = require('../../models/index').user;
const EnrolledVolunteer = require('../../models/index').enrolledVolunteer;

const roles = require('../../constants/roles');

const jwt = require('../../tools/jwt');

const _register = async ({
  name,
  email,
  password,
  phone,
  role,
  website,
  areaOfInterest,
  hours,
  corporate,
}) => {
  try {
    let userDetails = {
      name,
      email,
      password,
      phone,
      role,
    };

    let hashedPassword;
    if (userDetails.password) {
      hashedPassword = bcrypt.hashSync(userDetails.password, 8);
      delete userDetails.password;
    }

    userDetails = { ...userDetails, password: hashedPassword };

    let validRole = true;

    switch (role) {
      case roles.Admin:
        break;

      case roles.Corporate:
        userDetails = { ...userDetails, website };
        break;

      case roles.NGO:
        userDetails = { ...userDetails, areaOfInterest, website };
        break;

      case roles.Volunteer:
        userDetails = { ...userDetails, areaOfInterest, hours };
        break;

      default:
        validRole = false;
        break;
    }

    if (!validRole) throw Boom.badData('Invalid Role');

    if (userDetails) {
      const newUser = await User.create(userDetails);
      if (role === 'Volunteer' && corporate !== '') {
        const foundCorporate = await User.findOne({ name: corporate });
        const volunteerToBeEnrolledDetails = {
          corporateId: foundCorporate._id,
          volunteerId: newUser._id,
        };
        await EnrolledVolunteer.create(volunteerToBeEnrolledDetails);
      }
      return newUser;
    } else throw new Boom.internal("Couldn't create a Account");
  } catch (error) {
    console.log(error.message);
    throw Boom.internal(error.message);
  }
};

const _authenticate = async ({ email, password }) => {
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      const accessToken = jwt.generateJwtToken(foundUser);
      const refreshToken = jwt.generateRefreshToken(foundUser);
      return {
        ...foundUser.toJSON(),
        accessToken,
        refreshToken,
      };
    } else throw Boom.forbidden('Credentials Invalid');
  } catch (error) {
    throw Boom.internal(error.message);
  }
};

const _verifyRefreshToken = async ({ refreshToken }) => {
  try {
    const newToken = await jwt.verifyRefreshToken(refreshToken);
    const userId = newToken.production['x-user-id'];
    const user = await User.findById(userId);
    const newAccessToken = jwt.generateJwtToken(user);
    const newRefreshToken = jwt.generateRefreshToken(user);
    return {
      ...user.toJSON(),
      newAccessToken,
      newRefreshToken,
    };
  } catch (error) {
    throw Boom.internal(error.message);
  }
};

const _getNewToken = async ({ userId }) => {
  try {
    const user = await User.findById(userId);
    const newAccessToken = jwt.generateJwtToken(user);
    const newRefreshToken = jwt.generateRefreshToken(user);
    return {
      newAccessToken,
      newRefreshToken,
    };
  } catch (error) {
    throw Boom.internal(error.message);
  }
};

module.exports = {
  _register,
  _authenticate,
  _verifyRefreshToken,
  _getNewToken,
};
