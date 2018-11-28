const activityController = require('../controllers/activity.ctrl');

module.exports = (router) => {
  router
    .route('/activities')
    .get(activityController.getAll);

  router.route('/activity/:id')
    .get(activityController.getActivity);

  router
    .route('/activity')
    .post(activityController.addActivity);

  router
    .route('/activity/:id')
    .delete(activityController.removeActivity);
};
