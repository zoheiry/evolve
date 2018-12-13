const Activity = require('../models/Activity');
const { ObjectId } = require('mongoose').Types;

const highestWeightActivity = (activities) => (
  activities.sort((a1, a2) => a2.calculateWeight() - a1.calculateWeight())[0]
);

module.exports = {
  addActivity: (req, res) => {
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
    // TODO Admin action
    Activity.findById(req.params.id)
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
  getAll: (req, res) => {
    // TODO Admin action
    Activity.find().exec((error, activity) => {
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
        Activity.findById(req.params.id).then(activity =>
          activity.startSession()
            .then(_activity => res.send(_activity.activeSession))
            .catch(errorMessage => res.status(500).send(errorMessage))
        );
      }
    })
  },
  endSession: (req, res) => {
    Activity.findById(req.params.id).then(activity =>
      activity.endSession()
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
    Activity.find({ user: req.params.userId })
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
    Activity.findById(req.body.activityId)
      .then(activity => {
        activity.skip()
          .then(() => {
            Activity.find({ user: req.params.userId })
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
  }
};
