const {
  log,
  codes,
  respMw,
} = require('../../../config');

const VALIDATION_TYPE = [
  'apollo.model.validator.invalidvalue',
  'apollo.model.save.unsetrequired',
  'apollo.model.save.unsetkey',
];

const throwIfValidationErr = err => {
  console.log(err);
  if (err.type && (VALIDATION_TYPE.indexOf(err.type) !== -1)) {
    log.error('----------ValidationError--------');
    const code = { ...codes.CODE_933 };
    code.msg = `${code.msg} : ${err.message} `;
    code.description = err.message;
    respMw.TE(400, code);
  }
  respMw.TE(err.httpStatusCode || 500, err);
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
    respMw.TE(400, code);
  }
};

const throwErrorWithCode = (status = 500, code) => {
  respMw.TE(status, code);
};


module.exports = {
  throwIfValidationErr,
  throwValidationError,
  throwErrorWithCode,
};
