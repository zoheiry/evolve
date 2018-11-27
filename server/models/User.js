const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  email: String,
  schedule: {
    sunday: {
      start_time: { type: String },
      end_time: { type: String }
    },
    monday: {
      start_time: { type: String },
      end_time: { type: String }
    },
    tuesday: {
      start_time: { type: String },
      end_time: { type: String }
    },
    wednesday: {
      start_time: { type: String },
      end_time: { type: String }
    },
    thursday: {
      start_time: { type: String },
      end_time: { type: String }
    },
    friday: {
      start_time: { type: String },
      end_time: { type: String }
    },
    satruday: {
      start_time: { type: String },
      end_time: { type: String }
    }
  }
});

UserSchema.methods.updateSchedule = function(schedule) {
  this.schedule = schedule;
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);
