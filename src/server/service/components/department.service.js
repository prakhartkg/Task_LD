const {
  log, codes, throwError, exec,
} = require('../../../config');

const { departmentDAL } = require('../../dal');

exports.addDepartment = async departmentObj => {
  log.info('addDepartment service called');
  const [error, dept] = await exec(departmentDAL.getDepartmentByName(departmentObj.departmentName));
  if (error && error.httpStatusCode !== 404) {
    throw error;
  }
  if (dept) {
    log.error(`department: ${dept.departmentName} already present `);
    throwError(400, codes.CODE_9001);
  }
  const department = await departmentDAL.addDepartment(departmentObj);
  log.info('addDepartment service exit');
  return department;
};

exports.getDepartmentById = async departmentId => {
  log.info('getDepartmentById service called');
  const departments = await departmentDAL.getDepartmentById(departmentId);
  log.info('getAllDepartments service exit');
  return departments;
};

exports.getAllDepartments = async () => {
  log.info('getAllDepartments service called');
  const departments = await departmentDAL.getAllDepartments();
  log.info('getAllDepartments service exit');
  return departments;
};
