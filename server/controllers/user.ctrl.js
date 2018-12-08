const User = require('../models/User');

module.exports = {
  getUser: (request, response) => {
    User.findById(request.params.id).exec((error, user) => {
      if (error) {
        response.send(error);
      } else if (!user) {
        response.sendStatus(404);
      } else {
        response.send(user);
      }
    })
  },
  addUser: (request, response) => {
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
    })
  },
  removeUser: (request, response) => {
    User.findById(request.params.id).remove((error) => {
      if (error) {
        response.send(error);
      } else {
        response.sendStatus(200);
      };
    });
  },
  getAll: (request, response) => {
    User.find().exec((error, users) => {
      if (error) {
        response.send(error);
      } else if (!users) {
        response.sendStatus(404);
      } else {
        response.send(users);
      }
    })
  },
  updateSchedule: (request, response) => {
    User.findById(request.params.id).then(user =>
      user.updateSchedule(request.body).then(_user =>
        response.send(_user)
      )
    )
  }
};
