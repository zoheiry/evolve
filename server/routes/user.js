const userController = require('../controllers/user.ctrl');
const activityController = require('../controllers/activity.ctrl');

module.exports = (router) => {
  router
    .route('/users')
    .get(userController.getAll);

  router
    .route('/user/:id')
    .get(userController.getUser);

  router
    .route('/user')
    .post(userController.addUser);

  router
    .route('/user/:id')
    .patch(userController.updateSchedule)

  router
    .route('/user/:userId/activities')
    .get(activityController.getUserActivities)
};
