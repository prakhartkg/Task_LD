const { log, appError, codes } = require('./../../../config');

const controllerHandler = (promise, params) => async (req, res, next) => {
  try {
    const boundParams = params ? params(req, res, next) : [];
    if (req.device) {
      boundParams.push(req.device);
    }
    const result = await promise(...boundParams);
    res.status(result.httpStatusCode);
    return res.json(result || {
      message: 'OK',
    });
  } catch (error) {
    if (error instanceof appError) {
      return res.status(error.httpStatusCode) && next(error);
    }
    const err = codes.CODE_500;
    err.description = error.message;
    log.error(error);
    return res.status(500) && next(err);
  }
};

const errorHandler = (err, req, res, next) => {
  if (Object.prototype.isPrototypeOf.call(Error.prototype, err)) {
    log.error(`Error : ${JSON.stringify(err, null, 2)}`);
    return res.status(err.httpStatusCode || 500).json(err);
  }
  log.error('~~~ Unexpected error/exception ~~~');
  log.error(`Error : ${JSON.stringify(err, null, 2)}`);
  return res.status(500).json(
    Object.assign(err, { error: '⁽ƈ ͡ (ुŏ̥̥̥̥םŏ̥̥̥̥) ु' }),
  );
};


module.exports = {
  handler: controllerHandler,
  errorHandler,
};
