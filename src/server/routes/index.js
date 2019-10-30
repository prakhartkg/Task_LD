const express = require('express');

const { connectionHelper } = require('./../helper');
const { handler } = require('../middleware');

const departmentRoute = require('./components/department.route');
const userRoutes = require('./components/user.route');

// Express Router
const userRouter = express.Router();

// HealthCheckUrl - Checking Db connections {Cassandra, Redis}
userRouter.get('/healthCheck', handler(connectionHelper.testConnections, (req, res, next) => []));

// Registering Routers
userRouter.use('/user', userRoutes);
userRouter.use('/department', departmentRoute);


module.exports = userRouter;
