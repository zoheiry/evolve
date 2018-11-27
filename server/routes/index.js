const activity = require('./activity');
const user = require('./user');

module.exports = (router) => {
  activity(router);
  user(router);
};
