const Activity = require('../models/Activity');

module.exports = {
  addActivity: (request, response, next) => {
    new Activity({ name: request.body.name, 
      notes: request.body.notes, 
      priority: request.body.priority, 
      durationInHours: request.body.durationInHours, 
      hoursSpent: request.body.hoursSpent
    }).save((error, activity) => {
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
    Activity.find(request.params.id)
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
  }
};
