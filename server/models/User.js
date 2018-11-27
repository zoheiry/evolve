const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
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
    satruday: {
      startTime: { type: String },
      endTime: { type: String }
    }
  }
});

UserSchema.methods.updateSchedule = function(schedule) {
  this.schedule = schedule;
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);
