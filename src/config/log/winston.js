const winston = require('winston');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

// Logger default path
const logDirectory = path.join(process.env.LOG_PATH, 'logs');


const getFileNameandLine = () => {
  let fileName = '';
  let rowNumber;
  let columnNumber;

  // this is the value representing the position of your caller in the error stack.
  const currentStackPosition = 11;

  try {
    throw new Error('Custom Error');
  } catch (e) {
    Error.prepareStackTrace = function printStack(...args) {
      return args[1];
    };
    Error.prepareStackTrace(e, () => {});
    fileName = e.stack[currentStackPosition].getFileName();
    const str = fileName.split('/');
    fileName = str.slice(Math.max(str.length - 1, 1));
    rowNumber = e.stack[currentStackPosition].getLineNumber();
    columnNumber = e.stack[currentStackPosition].getColumnNumber();
  }
  return `[${fileName} [${rowNumber},${columnNumber}]]`;
};

const printMessageAndStack = info => {
  let { message } = info;
  try {
    if (info.stack) {
      if (Array.isArray(info.stack)) {
        message += '\n';
        message += info.stack.map(v => `\t${v}`).join('\n');
      } else {
        message += '\n';
        message += info.stack;
      }
    }
  } catch (err) {
    return message;
  }
  return message;
};

function ensureLogPath(_path = logDirectory) {
  // check log directory exists else create
  if (!fs.existsSync(_path)) {
    try {
      fs.mkdirSync(_path);
    } catch (e) {
      throw e;
    }
  }
}

// Access log
// create a rotating write stream
function getRotatableStream({
  compress = undefined, interval = '1d', maxFiles = 10, _logDirectory = logDirectory,
} = {}) {
  return rfs('app.log', {
    path: _logDirectory,
    interval,
    compress,
    maxFiles,
  });
}


/**
 * @param  {Object} [options]
 * @param  {String} [options.filename] - filename, complete path
 * @param  {String} [options.logLevel] - logLevel, `info`, `warn`, `debug`...
 * @param  {String} [options.logRotateDuration] - logRotateDuration,
 * @param  {Boolean} [options.json] - json, eg 'true | false'
 */
const LoggerConst = ({
  logLevel, filename, logRotateDuration, json,
} = {}) => {
  // ensure log path
  ensureLogPath(filename);

  // instantiate a new Winston Logger with the settings defined above
  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.printf(info => {
        if (info.level === 'error') {
          let fileName = '';
          try {
            fileName = process.env.NODE_ENV === 'test' || getFileNameandLine();
          } catch (e) {
            fileName = '';
          }
          return `[${info.level.toUpperCase()}] ${info.timestamp} ${fileName} ${printMessageAndStack(info)}`;
        }
        return `[${info.level.toUpperCase()}]  ${info.timestamp} ${JSON.stringify(info.message, null, 2)}`;
      }),
    ),

    transports: [
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp: true,
      }),
      new winston.transports.Stream({
        stream: getRotatableStream({
          compress: 'gzip',
          interval: logRotateDuration || '1d',
          logDirectory,
          json: false,
        }),
        handleExceptions: true,
        level: 'debug',
        colorize: true,
        timestamp: true,
      }),
    ],
    // do not exit on handled exceptions
    exitOnError: false,
  });

  if (process.env.NODE_ENV === 'test') {
    logger.remove(logger.transports.Console);
  }

  // create a stream object with a 'write' function that will be used by `morgan`
  logger.stream = {
    write: (message, encoding) => {
      logger.info(message);
      logger.info(encoding);
    },
  };
  return logger;
};

module.exports = LoggerConst;
