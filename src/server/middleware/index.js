const { handler, errorHandler } = require('./components/controllerHandler');
const payloadHandler = require('./components/payloadHandler');
const { authenticate } = require('./components/authenticationHandler');

module.exports = {
  handler,
  errorHandler,
  payloadHandler,
  authenticate,
};
