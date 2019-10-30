const bcrypt = require('bcrypt');

exports.encrypt = value => bcrypt.hash(value, 12);

exports.validate = (value, encryptedValue) => bcrypt.compare(value, encryptedValue);
