const userController = require('../controllers/user.ctrl');

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
};
