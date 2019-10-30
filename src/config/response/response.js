const log = require('./../log');

const resObj = {
  sendRes(httpStatusCode = 404, code, data = '') {
    const response = {
      httpStatusCode,
      statusCode: code.statusCode || 1000,
      status: code.status || false,
      msg: code.msg || 'System is under maintenance , Try after some time',
      data,
    };
    if (httpStatusCode > 299 || !code.status) {
      log.error(JSON.stringify(response, null, 2));
    }
    return response;
  },
};

module.exports = resObj;
