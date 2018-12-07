const mongoose = require('mongoose');
const moment = require('moment');

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
  activeSession: {
    start: Date
  },
  sessions: [
    {
      start: Date,
      end: Date
    }
  ]
});

ActivitySchema.methods.startSession = function() {
  if (this.activeSession.start) {
    return Promise.reject(
      `There is already an active session started on ${this.activeSession.start}`
    );
  } else {
    const start = new Date();
    this.activeSession = { start }
  }
  return this.save();
};

ActivitySchema.methods.endSession = function() {
  if (!this.activeSession.start) {
    return Promise.reject('There is no active session');
  }

  const end = new Date();
  const newSession = {
    start: this.activeSession.start,
    end
  }
  if (!this.sessions) {
    this.sessions = [newSession];
  } else {
    this.sessions.push(newSession);
  }
  this.activeSession = null;
  return this.save();
};

ActivitySchema.methods.deleteSession = function(id) {
  let foundSession;
  const newSessions = this.sessions.reduce((result, session) => {
    if (`${session._id}` === id) {
      foundSession = session;
      return result;
    }
    return result.concat(session);
  }, []);

  if (!foundSession) {
    return Promise.reject(`No session with id ${id} was found.`);
  }
  this.sessions = newSessions;
  return this.save();
};

ActivitySchema.methods.timeSpent = function() {
  if (!this.sessions || !this.sessions.length) {
    return 0;
  }
  let totalHours = 0;
  this.sessions.forEach(session => {
    const startDate = moment(session.start);
    const endDate = moment(session.end);
    const hours = startDate.diff(endDate, 'hours', true);
    totalHours += hours;
  });
  return totalHours;
};

module.exports = mongoose.model('Activity', ActivitySchema);
