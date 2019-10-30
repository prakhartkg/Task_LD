// Common import for the app
const mongoose = require('mongoose');

const mongoConfig = require('../db/mongoConfig');

const log = require('../log');

// =================DB SETUP (mongo setup)=========================

exports.connectToDatabase = callBack => {
  // Create the database connection
  mongoose.connect(mongoConfig.mongoDBURL, mongoConfig.options);

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', () => {
    log.info(`Mongoose default connection open to ${JSON.stringify(mongoConfig.mongoDBURL)}`);
    callBack();
  });

  // If the connection throws an error
  mongoose.connection.on('error', err => {
    log.info(`Mongoose default connection error: ${err} with connection info ${JSON.stringify(mongoConfig)}`);
    log.info('Server stopped!');
    process.exit(0);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    log.info(`Mongoose default connection disconnected : ${JSON.stringify(mongoConfig)}`);
    log.info('Server stopped!');
    process.exit(0);
  });
};
