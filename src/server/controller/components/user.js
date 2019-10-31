const jwt = require('jsonwebtoken');
const {
  log,
  resObj,
  codes,
  throwError,
} = require('../../../config');

const {
  userSvc,
} = require('../../service');

exports.login = async (email, pwd) => {
  log.info(`login called with email : ${email}`);
  const user = await userSvc.validateUser(email, pwd);
  delete user.password;
  const token = jwt.sign(user,
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1h' });
  user.token = token;
  return resObj.sendRes(200, codes.CODE_800, user);
};

exports.addUser = async (userObj, currentLoginUser) => {
  log.info(`addUser called with email : ${userObj.email}`);
  Object.assign(userObj, { createdBy: currentLoginUser._id });
  const user = await userSvc.addUser(userObj);
  return resObj.sendRes(201, codes.CODE_800, user);
};

exports.deleteUser = async (userId, currentLoginUser) => {
  log.info(`deleteUser called with userId : ${userId}`);
  if (currentLoginUser._id === userId) {
    throwError(403, codes.CODE_8003);
  }
  await userSvc.deleteUser(userId);
  return resObj.sendRes(204, codes.CODE_800, null);
};

exports.updateUser = async (userId, userBody, currentLoginUser) => {
  log.info(`updateUser called with userId : ${userId}`);
  const user = await userSvc.updateUser(userId, userBody, currentLoginUser);
  return resObj.sendRes(200, codes.CODE_800, user);
};

exports.getUsers = async (page, size) => {
  log.info(`getUsers called with page : ${page} and sixe ${size}`);
  const users = await userSvc.getAllUsers(page, size);
  return resObj.sendRes(200, codes.CODE_800, users);
};
