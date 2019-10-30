module.exports = {

  CODE_500: {
    statusCode: 500,
    status: false,
    msg: 'Internal Server Error',
  },
  CODE_800: {
    statusCode: 800,
    status: true,
    msg: 'Success',
  },
  CODE_824: {
    statusCode: 824,
    status: false,
    msg: 'You are not Authorized to do this action',
  },
  CODE_825: {
    statusCode: 825,
    status: false,
    msg: 'Authentication Error',
  },
  CODE_826: {
    statusCode: 826,
    status: false,
    msg: 'Payload validation error',
  },
  CODE_827: {
    statusCode: 827,
    status: false,
    msg: 'Schema Validation Error',
  },
  CODE_851: {
    statusCode: 851,
    status: true,
    msg: 'Null or Empty Response',
  },
  CODE_860: {
    statusCode: 860,
    status: true,
    msg: 'required param is null or undefined',
  },

  CODE_900: {
    statusCode: 900,
    status: true,
    msg: 'emailId or password is incorrect. Please try again with valid credentials.',
  },

  // Codes for User

  CODE_8000: {
    statusCode: 8000,
    status: false,
    msg: 'Unable to create user',
  },
  CODE_8001: {
    statusCode: 8001,
    status: false,
    msg: 'User not found',
  },
  CODE_8002: {
    statusCode: 8002,
    status: false,
    msg: 'User already present',
  },

  // Codes for Department
  CODE_9000: {
    statusCode: 9000,
    status: false,
    msg: 'Department not found',
  },
  CODE_9001: {
    statusCode: 9001,
    status: false,
    msg: 'Department already present.',
  },
};
