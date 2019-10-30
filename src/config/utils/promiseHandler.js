const AppError = require('../errors/AppError');

module.exports = {
  To: promise => promise.then(data => [null, data]).catch(err => [err, null]),
  // To Integration Response
  TIR: promise => promise.then(data => [null, data])
    .catch(err => {
      if (err.response) {
        return [err, err.response];
      }
      return [err, null];
    }),
  TE: (httpStatusCode, codes) => {
    throw new AppError(httpStatusCode,
      codes.statusCode, codes.msg, codes.status, codes.description, codes.authError);
  },
};
