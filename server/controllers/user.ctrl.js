const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  authenticate: (request, response, next) => {
    User.findOne({ email: request.body.email }, (error, userInfo) => {
      if (error) {
        next(error);
      } else {
        if (bcrypt.compareSync(request.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            request.app.get('secretKey'),
            { expiresIn: '1h' }
          );
          // response.json({ status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
          response.send({ user: userInfo, token });
        } else {
          response.status(401).send({ message: 'Invalid email/password' });
        }
      }
    });
   },
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
  createUser: (request, response) => {
    User.create(
      { email: request.body.email, password: request.body.password },
      (error, user) => {
        if (error) {
          if (error.code === 11000) {
            response.status(409).send({
              message: `user with the email ${request.body.email} already exists`
            })
          } else {
            response.status(400).send(error);
          }
        } else if (!user) {
          response.sendStatus(400);
        } else {
          response.send(user);
        }
      }
    );
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
  },
  changeOnBoardingState: (request, response) => {
    User.findById(request.params.id).then(user => 
      user.changeOnBoardingState(request.body.state)
        .then(_user => response.send(_user))
        .catch(error => response.status(422).send(error))
    );
  }
};
