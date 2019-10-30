const {
  log, codes, throwError,
} = require('../../../config');

const { departmentDAL } = require('../../dal');

exports.addDepartment = async departmentObj => {
  log.info('addDepartment service called');
  const dept = await departmentDAL.getDepartmentByName(departmentObj.departmentName);
  if (dept) {
    log.error(`department: ${dept.departmentName} already present `);
    throwError(400, codes.CODE_9000);
  }
  const department = await departmentDAL.addDepartment(departmentObj);
  log.info('addDepartment service exit');
  return department;
};

exports.getAllDepartments = async () => {
  log.info('getAllDepartments service called');
  const departments = await departmentDAL.getAllDepartments();
  log.info('getAllDepartments service exit');
  return departments;
};
