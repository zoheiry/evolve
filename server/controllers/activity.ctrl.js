const Activity = require('../models/Activity');

module.exports = {
  addActivity: (request, response, next) => {
    new Activity({ ...request.body, user: request.params.userId }).save((error, activity) => {
      if (error) {
        response.send(error);
      } else if (!activity) {
        response.sendStatus(400);
      } else {
        response.send(activity);
      }
      next();
    });
  },
  updateActivity: (request, response, next) => {
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
  removeActivity: (request, response, next) => {
    Activity.findById(request.params.id).remove((error) => {
      if (error) {
        response.send(error);
      } else {
        response.sendStatus(200);
      }
      next();
    })
  },
  getActivity: (request, response, next) => {
    Activity.findById(request.params.id)
      .exec((error, activity) => {
        if (error) {
          response.send(error);
        } else if (!activity) {
          response.sendStatus(404);
        } else {
          response.send(activity);
        }
        next();
      })
  },
  getAll: (request, response, next) => {
    Activity.find().exec((error, activity) => {
      if (error) {
        response.send(error);
      } else if (!activity) {
        response.sendStatus(404);
      } else {
        response.send(activity);
      }
      next();
    })
  },
  getUserActivities: (request, response, next) => {
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
        next();
      })
  },
  startSession: (request, response, next) => {
    Activity.where("activeSession").ne(null).then(activeSessions => {
      if (activeSessions[0]) {
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
  endSession: (request, response, next) => {
    Activity.findById(request.params.id).then(activity =>
      activity.endSession()
        .then(_activity => response.send(_activity.sessions))
        .catch(errorMessage => response.status(500).send(errorMessage))
    );
  },
  deleteSession: (request, response, next) => {
    Activity.findById(request.params.id).then(activity =>
      activity.deleteSession(request.body.sessionId)
        .then(() => response.sendStatus(200))
        .catch(errorMessage => response.status(500).send(errorMessage))
    );
  }
};
