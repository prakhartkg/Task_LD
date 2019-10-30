const mongoose = require('mongoose');
const {
  log,
  codes,
  resObj,
} = require('../../../config');


const testConnections = async () => {
  log.info('testConnections called');
  const connectionStatus = {
    apiAccess: true,
    mongodb: mongoose.connection.readyState,
  };
  log.info('testConnections Exit');
  return resObj.sendRes(200, codes.CODE_800, connectionStatus);
};

module.exports = {
  testConnections,
};
