const express = require("express")
const userRouter = require('./routes/user');
const activitiesRouter = require('./routes/activity');
const authRouter = require('./routes/auth');
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const jwt = require('jsonwebtoken');

const app = express();

app.set('secretKey', 'aSecretkey');

const Jobs = require('./jobs/agenda');

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/selfDevelopment";

/** connect to MongoDB datastore */
try {
  mongoose.connect(url, { useNewUrlParser: true});
} catch (error) {
  throw new Error(`Could not connect to ${url}`);
}

let port = 5000 || process.env.PORT

const validateUser = (req, res, next) => {
  jwt.verify(
    req.headers['x-access-token'],
    req.app.get('secretKey'),
    (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
          res.status(401);
        } else {
          res.status(400);
        }
        res.send(err);
      } else {
        req.body.currentUserId = decoded.id;
        next();
      }
    }
  ); 
}


/** set up middlewares */
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
//app.use('/static',express.static(path.join(__dirname,'static')))

/** set up routes {API Endpoints} */
app.use('/api', authRouter);
app.use('/api', validateUser, userRouter, activitiesRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use((err, req, res, next) => {
  console.log(err);
  if (err.status === 404) {
    res.status(404).send({ message: 'Not found' });
  } else {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

/** start server */
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});

Jobs.start();
