const _ = require('lodash');
const {
  log,
  codes,
  throwError,
} = require('../../../config');

const MODEL_VALIDATION_ERR_NAME = ['ValidationError', 'MongoError'];

const throwIfModelValidationError = err => {
  if (_.includes(MODEL_VALIDATION_ERR_NAME, err.name)) {
    log.error('-----Mongo Scheamsa validation error');
    const errorCode = codes.CODE_827;
    errorCode.description = `${err.message}`;
    throwError(400, errorCode);
  }
};

/**
 * Payload Validation JOI ERROR
 * @param {*} result
 */
const throwValidationError = result => {
  if (result.error) {
    log.error('----------JOI_ValidationError---Payload Not proper--------');
    const code = { ...codes.CODE_826 };
    code.description = result.error.details.filter(e => e.message)
      .map(e => e.message).reduce((c, e) => c.concat(e));
    code.msg = `${code.msg} : ${code.description} `;
    throwError(400, code);
  }
};


module.exports = {
  throwIfModelValidationError,
  throwValidationError,
};
