const AppError = require('../errors/AppError');

module.exports = {

  exec: promise => promise.then(data => [null, data]).catch(err => [err, null]),

  throwError: (httpStatusCode, codes) => {
    throw new AppError(httpStatusCode,
      codes.statusCode, codes.msg, codes.status, codes.description, codes.authError);
  },
};
