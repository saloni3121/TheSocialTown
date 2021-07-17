const mongoose = require('mongoose');

var enrolledVolunteerSchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  corporateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
});

module.exports = (mongoose) => {
  return mongoose.model('EnrolledVolunteer', enrolledVolunteerSchema);
};
