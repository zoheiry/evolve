const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.ctrl');
const activityController = require('../controllers/activity.ctrl');

router.get('/users', userController.getAll);
router.get('/user/self', userController.getCurrentUser);

router.get('/user/:id', userController.getUser);
router.delete('/user/:id', userController.removeUser);

router.put('/user/:id/schedule', userController.updateSchedule);
router.put('/user/:id/onboarding_state', userController.changeOnBoardingState);


router.get('/user/:userId/activities', activityController.getUserActivities);
router.post('/user/:userId/activity', activityController.addActivity);
router.get('/user/:userId/activity/suggested', activityController.getSuggestedActivity);
router.put('/user/:userId/activity/skip_suggested', activityController.skipSuggestedActivity);

module.exports = router;
