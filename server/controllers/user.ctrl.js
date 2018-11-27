const User = require('../models/User');

module.exports = {
  getUser: (request, response, next) => {
    User.findById(request.params.id).exec((error, user) => {
      if (error) {
        response.send(error);
      } else if (!user) {
        response.sendStatus(404);
      } else {
        response.send(user);
      }
      next();
    })
  },
  addUser: (request, response, next) => {
    new User({
      email: request.body.email,
      schedule: request.body.schedule
    }).save((error, user) => {
      if (error) {
        response.send(error);
      } else if (!user) {
        response.sendStatus(400);
      } else {
        response.send(user);
      };
      next();
    })
  },
  getAll: (request, response, next) => {
    User.find().exec((error, users) => {
      if (error) {
        response.send(error);
      } else if (!users) {
        response.sendStatus(404);
      } else {
        response.send(users);
      }
      next();
    })
  },
  updateSchedule: (request, response, next) => {
    User.findById(request.params.id).then(user => user.updateSchedule(request.body.schedule)
      .then((_user) => response.send(_user))
    )
  }
};
