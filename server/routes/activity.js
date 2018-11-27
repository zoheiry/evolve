const activityController = require('../controllers/activity.ctrl');

module.exports = (router) => {
  router
    .route('/activities')
    .get(activityController.getAll)

  router.route('/activity/:id')
    .get(activityController.get)

  router
    .route('/activity')
    .post(activityController.addActivity)
};
