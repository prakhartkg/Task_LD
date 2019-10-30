const randomString = require('randomstring');
const {
  log, codes, exec, throwError, encryption,
} = require('../../../config');

const { userDAL, departmentDAL } = require('../../dal');

exports.validateUser = async (email, pwd) => {
  log.info(`validateUser called for email : ${email}`);
  const user = await userDAL.getUserByEmail(email);
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
  const departments = await departmentDAL.getAllDepartments();
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
  const department = await departmentDAL.getDepartmentById(userObj.department);
  log.info(`User with email: ${userObj.email} with department: ${department.departmentName} adding`);
  const encPwd = await encryption.encrypt(randomString.generate(8));
  Object.assign(userObj, { password: encPwd });
  const user = await userDAL.addUser(userObj);
  return user;
};

exports.updateUser = async (userId, userObj) => {
  log.info('updateUser service called');
  if (userObj.department) {
    await departmentDAL.getDepartmentById(userObj.department);
  }
  const user = await userDAL.updateUser(userId, userObj);
  return user.isDeleted;
};

exports.deleteUser = async userId => {
  log.info('deleteUser service called');
  const success = await userDAL.deleteUserById(userId);
  return success;
};
