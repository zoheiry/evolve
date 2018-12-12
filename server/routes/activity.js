const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.ctrl');

router.get('/activities', activityController.getAll);

router.get('/activity/:id', activityController.getActivity);
router.put('/activity/:id', activityController.updateActivity);
router.delete('/activity/:id', activityController.removeActivity);

router.put('/activity/:id/start_session', activityController.startSession);
router.put('/activity/:id/end_session', activityController.endSession);
router.delete('/activity/:id/delete_session', activityController.deleteSession);

module.exports = router;
