const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: Array },
  noOfHours: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  opening: { type: Number },
  appliedVolunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  domain: { type: String },
  createdDate: { type: Date, default: Date.now },
});

module.exports = (mongoose) => {
  return mongoose.model('Post', postSchema);
};
