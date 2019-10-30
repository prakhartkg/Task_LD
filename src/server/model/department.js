const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    index: true,
  },
  departmentType: {
    type: String,
    default: 'OTHERS',
    trim: true,
    minlength: 1,
  },
});

const Department = mongoose.model('department', DepartmentSchema);

module.exports = { Department };
