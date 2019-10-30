const _ = require('lodash');
const Joi = require('@hapi/joi');

const { throwValidationError } = require('./../../helper').validationHelper;

/**
 *Login Payload Validation
 */
exports.login = (req, res, next) => {
  const credential = _.pick(req.body, ['logonId', 'password']);
  const schema = Joi.object().keys({
    logonId: Joi.string().min(5).required()
      .label('logonId'),
    password: Joi.string().min(1)
      .required()
      .label('password'),
  }).with('logonId', 'password');
  const result = schema.validate(credential);
  throwValidationError(result);
  return [credential.logonId, credential.password];
};
