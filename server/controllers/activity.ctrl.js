const Activity = require('../models/Activity');

const highestWeightActivity = (activities) => (
  activities.sort((a1, a2) => a2.calculateWeight() - a1.calculateWeight())[0]
);

module.exports = {
  addActivity: (request, response) => {
    new Activity({ ...request.body, user: request.params.userId }).save((error, activity) => {
      if (error) {
        response.send(error);
      } else if (!activity) {
        response.sendStatus(400);
      } else {
        response.send(activity);
      }
    });
  },
  updateActivity: (request, response) => {
    Activity.findByIdAndUpdate(request.params.id, request.body, (error, activity) => {
      if (error) {
        response.send(error);
      } else if (!activity) {
        response.sendStatus(400);
      } else {
        response.send({
          ...activity._doc,
          ...request.body
        });
      }
    });
  },
  removeActivity: (request, response) => {
    Activity.findById(request.params.id).remove((error) => {
      if (error) {
        response.send(error);
      } else {
        response.sendStatus(200);
      }
    })
  },
  getActivity: (request, response) => {
    Activity.findById(request.params.id)
      .exec((error, activity) => {
        if (error) {
          response.send(error);
        } else if (!activity) {
          response.sendStatus(404);
        } else {
          response.send(activity);
        }
      })
  },
  getAll: (request, response) => {
    Activity.find().exec((error, activity) => {
      if (error) {
        response.send(error);
      } else if (!activity) {
        response.sendStatus(404);
      } else {
        response.send(activity);
      }
    })
  },
  getUserActivities: (request, response) => {
    Activity.find({ user: request.params.userId })
      .sort({ priority: 'desc' })
      .exec((error, activities) => {
        if (error) {
          response.send(error);
        } else if (!activities) {
          response.sendStatus(404);
        } else {
          response.send(activities);
        }
      })
  },
  startSession: (request, response) => {
    Activity.where("activeSession").ne(null).then(activities => {
      if (activities[0]) {
        response.status(405).send('You can only have 1 active session at a time');
      } else {
        Activity.findById(request.params.id).then(activity =>
          activity.startSession()
            .then(_activity => response.send(_activity.activeSession))
            .catch(errorMessage => response.status(500).send(errorMessage))
        );
      }
    })
  },
  endSession: (request, response) => {
    Activity.findById(request.params.id).then(activity =>
      activity.endSession()
        .then(_activity => response.send(_activity.sessions))
        .catch(errorMessage => response.status(500).send(errorMessage))
    );
  },
  deleteSession: (request, response) => {
    Activity.findById(request.params.id).then(activity =>
      activity.deleteSession(request.body.sessionId)
        .then(() => response.sendStatus(200))
        .catch(errorMessage => response.status(500).send(errorMessage))
    );
  },
  getSuggestedActivity: (request, response) => {
    Activity.find({ user: request.params.userId })
      .then(activities => response.send(highestWeightActivity(activities)))
      .catch((error) => {
        if (error) {
          response.status(500).send(error.message);
        } else {
          response.sendStatus(500);
        }
      })
  },
  skipSuggestedActivity: (request, response) => {
    Activity.findById(request.body.activityId)
      .then(activity => {
        activity.skip()
          .then(() => {
            Activity.find({ user: request.params.userId })
              .then(activities => {
                const filteredActivities = activities.filter(a => a._id.toString() !== activity.id);
                response.send(highestWeightActivity(filteredActivities));
              })
              .catch(error => response.status(500).send(error.message));
          })
          .catch(() => response.status(500).send('Failed to skip'))
      })
      .catch(error => {
        if (error) {
          response.status(500).send(error.message);
        } else {
          response.sendStatus(500);
        }
      })
  }
};
