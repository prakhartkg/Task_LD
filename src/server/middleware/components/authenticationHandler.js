const jwt = require('jsonwebtoken');

const { log, codes,resObj } = require('../../../config');

exports.authenticate = (req, res, next) => {
  log.info('---------------Authentication-----------------');
  const token = req.headers['authorization']
  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    (err, decode) => {
      if (err) {
        log.error('--------------Authentication Failed-----------');
        return res.status(401) && res.json(resObj.sendRes(401, codes.CODE_825, null));
      }
      req.userInfo = decode;
      next();
    },
  );
};
