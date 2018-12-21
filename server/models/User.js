const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  onBoardingState: {
    type: String,
    enum: ['fresh', 'schedule', 'activities', 'complete'],
    default: 'fresh',
  },
  schedule: {
    sunday: {
      startTime: { type: String },
      endTime: { type: String }
    },
    monday: {
      startTime: { type: String },
      endTime: { type: String }
    },
    tuesday: {
      startTime: { type: String },
      endTime: { type: String }
    },
    wednesday: {
      startTime: { type: String },
      endTime: { type: String }
    },
    thursday: {
      startTime: { type: String },
      endTime: { type: String }
    },
    friday: {
      startTime: { type: String },
      endTime: { type: String }
    },
    saturday: {
      startTime: { type: String },
      endTime: { type: String }
    }
  }
});

UserSchema.methods.updateSchedule = function(schedule) {
  this.schedule = schedule;
  return this.save();
};

UserSchema.methods.changeOnBoardingState = function(state) {
  this.onBoardingState = state;
  return this.save();
}

UserSchema.methods.changePassword = function(newPassword) {
  this.password = newPassword;
  return this.save();
}

module.exports = mongoose.model('User', UserSchema);
