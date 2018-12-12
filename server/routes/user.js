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
    .route('/user/:id/schedule')
    .post(userController.updateSchedule);

  router
    .route('/user/:userId/activities')
    .get(activityController.getUserActivities);

  router
    .route('/user/:id')
    .delete(userController.removeUser);

  router
    .route('/user/:userId/activity')
    .post(activityController.addActivity);

  router
    .route('/user/:userId/activity/suggested')
    .get(activityController.getSuggestedActivity)

  router
    .route('/user/:userId/activity/skip_suggested')
    .put(activityController.skipSuggestedActivity)

  router
    .route('/user/:id/onboarding_state')
    .put(userController.changeOnBoardingState)
};
