const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    validate: {
      validator: value => validator.isEmail(value),
      message: 'Not a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    validate: {
      validator: value => validator.isNumeric(value),
      message: 'Not a valid Mobile No',
    },
  },
  department: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    index: true,
  },
  createdBy: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  createdDate: {
    type: Date,
    index: true,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
