// const Boom = require('@hapi/boom');
// const expressJwt = require('express-jwt');
// const get = require('lodash.get');
// const User = require('../models').user;
// const token = require('../constants/token');

// const secret = JSON.parse(process.env.JWT_SECRET);

// const authorize = () => {
//   return [
//     // authenticate JWT token and attach user to request object (req.user)
//     expressJwt({ secret: secret.key, algorithms: [secret.type] }),
//     async (req, res, next) => {
//       const userId = get(req, `user['${token.TOKEN_KEY}'].x-user-id`, null);

//       if (!userId) {
//         return next(Boom.unauthorized('Unauthorized'));
//       }

//       const user = await User.findById(userId);

//       if (!user) {
//         return next(Boom.unauthorized('Unauthorized'));
//       }

//       req.user = user;

//       next();
//     },
//   ];
// };

// module.exports = authorize;

const Boom = require('@hapi/boom');
const expressJwt = require('express-jwt');
const get = require('lodash.get');
const intersection = require('lodash.intersection'); 
const User = require('../models').user;
const token = require('../constants/token'); 
const secret = JSON.parse(process.env.JWT_SECRET);

const authorize = (roles) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  console.log(roles);
  return [
    // authenticate JWT token and attach user to request object (req.user)
    expressJwt({ secret: secret.key, algorithms: [secret.type] }),

    async (req, res, next) => {
      // console.log(req.user);
      const userId = get(req, `user['${token.TOKEN_KEY}'].x-user-id`, null);
      console.log(!roles.length);
      console.log(userId);
      if (!userId || !roles.length) {
        return next(Boom.unauthorized('Unauthorized'));
      }
  
      const user = await User.findById(userId);
      // console.log(user);
      console.log(!intersection(roles, user.role).length);
      if (!user || !intersection(roles, [user.role]).length) {
        return next(Boom.unauthorized('Unauthorized'));
      }

      req.user = user;

      next();
    },
  ];
};

module.exports = authorize;
