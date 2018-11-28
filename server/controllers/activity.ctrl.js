const Activity = require('../models/Activity');

module.exports = {
  addActivity: (request, response, next) => {
    new Activity(request.body).save((error, activity) => {
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
    Activity.findById(request.params.id).exec((error, activity) => {
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
    Activity.find({ user: request.params.userId }, (error, activities) => {
      if (error) {
        response.send(error);
      } else if (!activities) {
        response.sendStatus(404);
      } else {
        response.send(activities);
      }
      next();
    })
  }
};
