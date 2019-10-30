const config = () => {
  if (!process.env.MONGODB_URL) {
    throw new Error('Env MONGODB_URL is not present');
  }
  const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  };

  let url = process.env.MONGODB_URL;

  if (process.env.NODE_ENV === 'test') {
    url = process.env.MONGODB_TEST_URL;
  }

  if (process.env.MONGODB_USER && process.env.MONGODB_PSWD) {
    url = process.env.MONGODB_URL;
    Object.assign(options, {
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PSWD,
      authSource: process.env.MONGODB_DB,
    });
  }

  const mongoConfig = Object.freeze({
    mongoDBURL: url,
    options,
  });

  return mongoConfig;
};


module.exports = config();
