const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.ctrl');

router.get('/activities', activityController.getUserActivities);

router.post('/activity', activityController.createActivity);
router.get('/activity/:id', activityController.getActivity);
router.put('/activity/:id', activityController.updateActivity);
router.delete('/activity/:id', activityController.removeActivity);

router.put('/activity/:id/start_session', activityController.startSession);
router.put('/activity/:id/end_session', activityController.endSession);
router.delete('/activity/:id/delete_session', activityController.deleteSession);


router.get('/activity/suggested', activityController.getSuggestedActivity);
router.put('/activity/skip_suggested', activityController.skipSuggestedActivity);

module.exports = router;
