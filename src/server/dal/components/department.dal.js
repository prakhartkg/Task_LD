const { Department } = require('./../../model/department');

const {
  log, codes, throwError, exec,
} = require('../../../config');

const { validationHelper } = require('../../helper');

exports.addDepartment = async department => {
  log.info('addDepartment DAL  called');
  const [err, response] = await exec(Department.create(department));
  if (err) {
    validationHelper.throwIfModelValidationError(err);
    throwError(403, codes.CODE_500);
  }
  log.info('addDepartment DAO exited');
  return response;
};

exports.getDepartmentById = async departmentId => {
  log.info('getDepartmentById DAL  called');
  const [err, response] = await exec(Department.findById(departmentId));
  if (err) {
    validationHelper.throwIfModelValidationError(err);
    throwError(403, codes.CODE_500);
  }
  if (!response) {
    throwError(404, codes.CODE_9000);
  }
  log.info('getDepartmentById DAO exited');
  return response;
};
exports.getDepartmentByName = async departmentName => {
  log.info('getDepartmentById DAL  called');
  const [err, response] = await exec(Department.findOne({ departmentName }));
  if (err) {
    validationHelper.throwIfModelValidationError(err);
    throwError(403, codes.CODE_500);
  }
  if (!response) {
    throwError(404, codes.CODE_9000);
  }
  log.info('getDepartmentById DAO exited');
  return response;
};
exports.getAllDepartments = async () => {
  log.info('getAllDepartments DAL  called');
  const [err, response] = await exec(Department.find());
  if (err) {
    validationHelper.throwIfModelValidationError(err);
    throwError(403, codes.CODE_500);
  }
  log.info('getAllDepartments DAO exited');
  return response;
};
