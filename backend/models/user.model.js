const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String },
  points: { type: Number, default: 0 },
  areaOfInterest: { type: Array },
  hours: { type: Number },
  createdDate: { type: Date, default: Date.now },
});

module.exports = (mongoose) => {
  return mongoose.model('User', userSchema);
};
