const Activity = require('../models/Activity');
const { ObjectId } = require('mongoose').Types;

const highestWeightActivity = (activities) => (
  activities.sort((a1, a2) => a2.calculateWeight() - a1.calculateWeight())[0]
);

module.exports = {
  createActivity: (req, res) => {
    new Activity({ ...req.body, user: req.body.currentUserId }).save((error, activity) => {
      if (error) {
        res.status(400).send(error);
      } else if (!activity) {
        res.sendStatus(400);
      } else {
        res.send(activity);
      }
    });
  },
  updateActivity: (req, res) => {
    Activity.findOneAndUpdate(
      { _id: ObjectId(req.params.id), user: req.body.currentUserId },
      req.body,
      (error, activity) => {
        if (error) {
          res.send(error);
        } else if (!activity) {
          res.sendStatus(400);
        } else {
          res.send({
            ...activity._doc,
            ...req.body
          });
        }
      }
    );
  },
  removeActivity: (req, res) => {
    Activity.findOneAndRemove(
      { _id: ObjectId(req.params.id), user: req.body.currentUserId },
      (error) => {
        if (error) {
          res.send(error);
        } else {
          res.sendStatus(200);
        }
      }
    );
  },
  getUserActivities: (req, res) => {
    Activity.find({ user: req.body.currentUserId })
      .sort({ priority: 'desc' })
      .exec((error, activities) => {
        if (error) {
          res.send(error);
        } else if (!activities) {
          res.sendStatus(404);
        } else {
          res.send(activities);
        }
      })
  },
  getActivity: (req, res) => {
    Activity.find({ _id: ObjectId(req.params.id), user: req.body.currentUserId })
      .exec((error, activity) => {
        if (error) {
          res.send(error);
        } else if (!activity) {
          res.sendStatus(404);
        } else {
          res.send(activity);
        }
      })
  },
  startSession: (req, res) => {
    Activity.where("activeSession").ne(null).then(activities => {
      if (activities[0]) {
        res.status(405).send('You can only have 1 active session at a time');
      } else {
        Activity.find({ _id: ObjectId(req.params.id), user: req.body.currentUserId })
          .then(activity =>
            activity[0]
              .startSession()
              .then(_activity => res.send(_activity.activeSession))
              .catch(errorMessage => res.status(500).send(errorMessage))
          )
          .catch(error => res.status(400).send(error));
      }
    })
  },
  endSession: (req, res) => {
    Activity.find({ _id: ObjectId(req.params.id), user: req.body.currentUserId }).then(activity =>
      activity[0].endSession()
        .then(_activity => res.send(_activity.sessions))
        .catch(errorMessage => res.status(500).send(errorMessage))
    );
  },
  deleteSession: (req, res) => {
    Activity.findById(req.params.id).then(activity =>
      activity.deleteSession(req.body.sessionId)
        .then(() => res.sendStatus(200))
        .catch(errorMessage => res.status(500).send(errorMessage))
    );
  },
  getSuggestedActivity: (req, res) => {
    Activity.find({ user: req.body.currentUserId })
      .then(activities => res.send(highestWeightActivity(activities)))
      .catch((error) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.sendStatus(500);
        }
      })
  },
  skipSuggestedActivity: (req, res) => {
    // TODO: no need to send activityId from the client,
    // the backend already knows the ID of the suggested activity.
    Activity.find({ _id: ObjectId(req.body.activityId), user: req.body.currentUserId })
      .then(activity => {
        activity[0].skip()
          .then(() => {
            Activity.find({ user: req.body.currentUserId })
              .then(activities => {
                const filteredActivities = activities.filter(a => a._id.toString() !== activity.id);
                res.send(highestWeightActivity(filteredActivities));
              })
              .catch(error => res.status(500).send(error.message));
          })
          .catch(() => res.status(500).send('Failed to skip'))
      })
      .catch(error => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.sendStatus(500);
        }
      })
  },
};
