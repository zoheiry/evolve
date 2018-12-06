const mongoose = require('mongoose');
const remove = require('lodash/remove');

let ActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: String,
  priority: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  maxDuration: Number,
  hoursSpent: {
    type: Number,
    default: 0
  },
  sessions: [
    {
      start: Date,
      end: Date,
      active: Boolean
    }
  ]
});

ActivitySchema.methods.startSession = function(start) {
  const newSession = {
    start,
    active: true
  };
  if (!this.sessions) {
    this.sessions = [newSession];
  } else {
    this.sessions = this.sessions.concat(newSession);
  }
  return this.save();
};

ActivitySchema.methods.endSession = function(end) {
  this.sessions = this.sessions.map(session => {
    if (session.active) {
      return {
        start: session.start,
        end,
        active: false
      };
    }
    return session;
  });
  return this.save();
};

module.exports = mongoose.model('Activity', ActivitySchema);
