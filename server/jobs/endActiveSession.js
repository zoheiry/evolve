const moment = require('moment');
const Activity = require('../models/Activity');

const getTimeDifferentInHours = (date) =>
  moment(Date.now()).diff(moment(date), 'hours', true);

module.exports = (agenda) => {
  agenda.define('end active session', (job, done) => {
  Activity.where("activeSession").ne(null).then(activities => {
    const activity = activities[0];
    if (activity) {
      const activeSessionRunningTime = getTimeDifferentInHours(activity.activeSession.start);
      if (activeSessionRunningTime > 2) {
        activity.endSession().then(done)
      } else {
        done();
      }
    } else {
      done();
    }
  })
});
};
