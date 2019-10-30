const { User } = require('./../../model/user');

const {
  log, codes, throwError, exec,
} = require('../../../config');

const { validationHelper } = require('../../helper');

exports.addUser = async user => {
  log.info('addUser DAL  called');
  const [err, response] = await exec(User.create(user));
  if (err) {
    validationHelper.throwIfModelValidationError(err);
    throwError(403, codes.CODE_500);
  }
  log.info('addUser DAO exited');
  return response;
};

exports.getUserByEmail = async email => {
  log.info('getUserByEmail DAL  called');
  const [err, response] = await exec(User.findOne({ email }).lean());
  if (err) {
    validationHelper.throwIfModelValidationError(err);
    throwError(403, codes.CODE_500);
  }
  if (!response) {
    throwError(401, codes.CODE_900);
  }
  log.info('getUserByEmail DAO exited');
  return response;
};

exports.getUserById = async id => {
  log.info('getUserById DAL  called');
  const [err, response] = await exec(User.findOne({ _id: id }));
  if (err) {
    validationHelper.throwIfModelValidationError(err);
    throwError(403, codes.CODE_500);
  }
  log.info('getUserById DAO exited');
  if (!response || response.isDeleted) {
    throwError(403, codes.CODE_8001);
  }
  return response;
};

exports.getAllUsers = async (pageNumber, pageSize) => {
  log.info('getAllUsers DAL  called');
  const [err, response] = await exec(
    User.find()
      .skip((parseInt(pageNumber, 10) - 1) * parseInt(pageSize, 10))
      .limit(parseInt(pageSize, 10))
      .sort('-createdDate')
      .lean(),
  );
  if (err) {
    validationHelper.throwIfModelValidationError(err);
    throwError(403, codes.CODE_500);
  }
  log.info('getAllUsers DAO exited');
  return response.filter(user => !user.isDeleted);
};

exports.deleteUserById = async id => {
  log.info('deleteUserById DAL  called');
  await exec(this.getUserById(id));
  const [error, resp] = await exec(
    User.findOneAndUpdate({ _id: id }, { isDeleted: true }),
  );
  if (error) {
    validationHelper.throwIfModelValidationError(error);
    throwError(403, codes.CODE_500);
  }
  log.info('deleteUserById DAO exited');
  return resp;
};

exports.updateUser = async (id, user) => {
  log.info('updateUser DAL  called');
  const [err, response] = await exec(
    User.findOneAndUpdate({ _id: id }, user, { new: true }).lean(),
  );
  if (err) {
    validationHelper.throwIfModelValidationError(err);
    throwError(403, codes.CODE_500);
  }
  log.info('updateUser DAO exited');
  return response;
};
