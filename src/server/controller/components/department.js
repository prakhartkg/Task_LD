const {
  log,
  resObj,
  codes,
} = require('../../../config');

const {
  departmentSvc,
} = require('../../service');

exports.addDepartment = async departmentBody => {
  log.info('addDepartment called');
  const department = await departmentSvc.addDepartment(departmentBody);
  log.info('addDepartment exit');
  return resObj.sendRes(200, codes.CODE_800, department);
};

exports.getAllDepartments = async () => {
  log.info('getAllDepartments called');
  const department = await departmentSvc.getAllDepartments();
  log.info('getAllDepartments exit');
  return resObj.sendRes(200, codes.CODE_800, department);
};
