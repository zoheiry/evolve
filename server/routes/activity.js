const activityController = require('../controllers/activity.ctrl');

module.exports = (router) => {
  router
    .route('/activities')
    .get(activityController.getAll);

  router.route('/activity/:id')
    .get(activityController.getActivity);

  router.route('/activity/:id')
    .put(activityController.updateActivity);

  router
    .route('/activity/:id')
    .delete(activityController.removeActivity);

  router
    .route('/activity/:id/start_session')
    .put(activityController.startSession);

  router
    .route('/activity/:id/end_session')
    .put(activityController.endSession);
};
