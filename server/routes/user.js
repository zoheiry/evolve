const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.ctrl');

router.get('/user/self', userController.getCurrentUser);
router.put('/user/self/schedule', userController.updateSchedule);
router.put('/user/self/onboarding_state', userController.changeOnBoardingState);
router.put('/user/self/change_password', userController.changePassword);

// TODO: Admin routes.
router.get('/users', userController.getAll);
router.get('/user/:id', userController.getUser);
router.delete('/user/:id', userController.removeUser);

module.exports = router;
