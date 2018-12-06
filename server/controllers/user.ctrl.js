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
  removeUser: (request, response, next) => {
    User.findById(request.params.id).remove((error) => {
      if (error) {
        response.send(error);
      } else {
        response.sendStatus(200);
      };
      next();
    });
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
    User.findById(request.params.id).then(user =>
      user.updateSchedule(request.body).then(_user =>
        response.send(_user)
      )
    )
  }
};
