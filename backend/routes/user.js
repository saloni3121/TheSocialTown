const express = require('express');
const router = express.Router();

const {
  getUserById,
  getAllUsers,
  getAllEnrolledVolunteers,
  updateVolunteer,
  getEnrolledVolunteers
} = require('../controllers/user.controller');

const roles = require('../constants/roles');

const authorize = require('../middleware/authorize');

router.get('/user/:id', getUserById);

router.get('/all-users', getAllUsers);

router.get('/enrolled-volunteers/:corporateId', getAllEnrolledVolunteers);

router.get('/all-enrolled-volunteers',getEnrolledVolunteers)

router.put('/update-volunteer/:id', updateVolunteer) 

module.exports = router;
