const Agenda = require('agenda');
const endActiveSessionJob = require('./endActiveSession');

const mongoConnectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/selfDevelopment";
const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    collection: 'jobs',
    options: { useNewUrlParser: true },
  }
});

// initalize all jobs here
endActiveSessionJob(agenda);

async function start() {
  await agenda.start();
  await agenda.every('1 minute', 'end active session');
}

async function graceful() {
  console.log('Gracefully shutting down...')
  await agenda.stop();
  process.exit(0);
}
  
process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

module.exports = { start }
