const { exec, log } = require('./../../../config');
const { User } = require('./../../model/user');
const { Department } = require('./../../model/department');

exports.initializeData = async () => {
  let res;
  let err;
  let dept;
  [err, res] = await exec(Department.find());
  if (err) {
    log.error(err);
  }
  if (!res || res.length === 0) {
    const department = {};
    department.departmentName = 'SUPER USER';
    department.departmentType = 'ADMIN';
    [err, dept] = await exec(Department.create(department));
  }
  [err, res] = await exec(User.find());

  if (err) {
    log.error(err);
  }
  if (!res || res.length === 0) {
    const user = {
      isDeleted: false,
      firstName: 'prakhar',
      lastName: 'jain',
      email: 'prakhartkg@gmail.com',
      department: dept._id,
      phone: '9483289130',
      password: '$2b$12$kx6zPPM/dNB35lqWdx3z1.S5dII2iXNuB76I8FPP.cuP2jVLFMZ0S',
      createdBy: 'Predefined',
      createdDate: '2019-10-31T06:39:28.665Z',
    };
    await exec(User.create(user));
  }
};
