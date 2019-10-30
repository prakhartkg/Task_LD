const log = require('./winston')({
  logLevel: 'debug', // default debug
  filename: `${process.env.LOG_PATH}/logs`,
  logRotateDuration: '1d', // 1d = 1 day, 10s = 10sec, 1h = 1 hour
  json: false, // true or false
});

module.exports = log;
