const { ObjectId } = require('mongoose').Types;

exports.prePopulatedUser = [{
  _id: ObjectId('5db992a11379dd48bb0a1ae8'),
  isDeleted: false,
  firstName: 'prakhar',
  lastName: 'jain',
  email: 'prakhartkg@gmail.com',
  department: '5db98f11474eb1424f9f8a2b',
  phone: '9483289130',
  password: '$2b$12$kx6zPPM/dNB35lqWdx3z1.S5dII2iXNuB76I8FPP.cuP2jVLFMZ0S',
  createdBy: 'Predefined',
},
{
  _id: ObjectId('5db992a11379dd48bb0a1ae7'),
  isDeleted: false,
  firstName: 'Prashu',
  lastName: 'jain',
  email: 'prashupre@gmail.com',
  department: '5db98f11474eb1424f9f8a2b',
  phone: '9483289130',
  password: '$2b$12$kx6zPPM/dNB35lqWdx3z1.S5dII2iXNuB76I8FPP.cuP2jVLFMZ0S',
  createdBy: 'Predefined',
}];

exports.prePopulatedDepartments = [
  {
    _id: ObjectId('5db98f11474eb1424f9f8a2b'),
    departmentType: 'ADMIN',
    departmentName: 'SUPER USER',
  },
  {
    departmentName: 'IT',
  },
  {
    departmentName: 'R&D',
  },
  {
    departmentName: 'Sales',
  },
];
