const express = require('express');

const { connectionHelper } = require('./../helper');
const { handler } = require('../middleware');


// Express Router
const userRouter = express.Router();

// HealthCheckUrl - Checking Db connections {Cassandra, Redis}
userRouter.get('/healthCheck', handler(connectionHelper.testConnections, (req, res, next) => []));

// Registering Routers


module.exports = userRouter;
