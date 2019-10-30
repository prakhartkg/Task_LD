const randomString = require('randomstring');
const {
  log, codes, exec, throwError, encryption,
} = require('../../../config');

const { userDAL } = require('../../dal');
const departmentSvc = require('../../service/components/department.service');

exports.validateUser = async (email, pwd) => {
  log.info(`validateUser called for email : ${email}`);
  const user = await userDAL.getUserByEmail(email);
  const department = await departmentSvc.getDepartmentById(user.department);
  user.department = department;
  const success = await encryption.validate(pwd, user.password);
  if (!success) {
    log.info(`Password verification failed for email: ${email}`);
    throwError(401, codes.CODE_900);
  }
  log.info('validateUser exit');
  return user;
};

exports.getAllUsers = async (page = 1, size = 10) => {
  log.info(`getAllUsers called with page : ${page} and size: ${size}`);
  const users = await userDAL.getAllUsers(page, size);
  const departments = await departmentSvc.getAllDepartments();
  return users.map(user => {
    const userObj = { ...user };
    const department = departments.find(
      dept => dept._id.toString() === user.department,
    );
    userObj.departmentName = department.departmentName;
    return userObj;
  });
};

exports.addUser = async userObj => {
  log.info('addUser service called');
  const [error, userPresent] = await exec(
    userDAL.getUserByEmail(userObj.email),
  );
  if (userPresent) {
    throwError(400, codes.CODE_8002);
  }
  if (error && error.code !== 900) {
    throw error;
  }
  const department = await departmentSvc.getDepartmentById(userObj.department);
  log.info(`User with email: ${userObj.email} with department: ${department.departmentName} adding`);
  const encPwd = await encryption.encrypt(randomString.generate(8));
  Object.assign(userObj, { password: encPwd });
  const user = await userDAL.addUser(userObj);
  return user;
};

exports.updateUser = async (userId, userObj, currentLoginUser) => {
  log.info('updateUser service called');
  await userDAL.getUserById(userId);
  if (userObj.department) {
    if (userId === currentLoginUser._id) {
      throwError(403, codes.CODE_8004);
    }
    await departmentSvc.getDepartmentById(userObj.department);
  }
  const user = await userDAL.updateUser(userId, userObj);
  return user;
};

exports.deleteUser = async userId => {
  log.info('deleteUser service called');
  await userDAL.getUserById(userId);
  const user = await userDAL.deleteUserById(userId);
  return user.isDeleted;
};
