const _ = require('lodash');
const Joi = require('@hapi/joi');

const { throwValidationError } = require('./../../helper').validationHelper;

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

exports.addUser = (req, res, next) => {
  const userBody = _.pick(req.body,
    ['firstName', 'lastName', 'email', 'department', 'phone']);
  const schema = Joi.object().keys({
    firstName: Joi.string().min(1).required()
      .label('firstName'),
    lastName: Joi.string().trim().min(1).required().label('lastName'),
    email:Joi.string().trim().email().min(1).required().label('email'),
    department:Joi.string().trim().min(1).required().label('department'),
    phone:Joi.string().trim().min(10).label('phone')
  });
  const result = schema.validate(userBody);
  throwValidationError(result);
  return [userBody,req.userInfo];
};

exports.updateUser = (req, res, next) => {
  const userBody = _.pick(req.body,
    ['firstName', 'lastName', 'email', 'department', 'phone']);
  const schema = Joi.object().keys({
    firstName: Joi.string().trim().min(1).label('firstName'),
    lastName: Joi.string().trim().min(1).label('lastName'),
    email:Joi.string().trim().email().min(1).label('email'),
    department:Joi.string().trim().min(1).label('department'),
    phone:Joi.string().trim().min(10).label('phone')
  });
  const result = schema.validate(userBody);
  throwValidationError(result);
  return [req.params.id, userBody];
};

exports.addDepartment = (req, res, next) => {
  const departmentBody = _.pick(req.body, ['departmentName']);
  const schema = Joi.object().keys({
    departmentName: Joi.string().trim().min(1).required()
      .label('logonId'),
  });
  const result = schema.validate(departmentBody);
  throwValidationError(result);
  return [departmentBody];
};

exports.getAllDepartments = (req, res, next) => [];

exports.getUsers = (req, res, next) => [req.query.page,req.query.size];

exports.deleteUser = (req, res, next) => [req.params.id];
