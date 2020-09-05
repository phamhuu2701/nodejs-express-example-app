// mongodb
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME || "haloha";
const MONGO_DATABASE_USERNAME = process.env.MONGO_DATABASE_USERNAME || "";
const MONGO_DATABASE_PASSWORD = process.env.MONGO_DATABASE_PASSWORD || "";
const MONGO_URL =
  MONGO_DATABASE_USERNAME && MONGO_DATABASE_PASSWORD
    ? `mongodb://${MONGO_DATABASE_USERNAME}:${MONGO_DATABASE_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE_NAME}?retryWrites=true`
    : `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE_NAME}?retryWrites=true`;

const CONFIG = {
  ENV: process.env.ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3002,

  // mongodb
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE_NAME,
  MONGO_DATABASE_USERNAME,
  MONGO_DATABASE_PASSWORD,
  MONGO_URL,

  // jwt
  JWT_EXPIRATION: parseInt(process.env.JWT_EXPIRATION) || 86400, // 1 day
  JWT_SECRET:
    process.env.JWT_SECRET || "haloha-jwt-serect-ashd8721s-198xb12yy-q2v9q2yeq",
};

module.exports = CONFIG;
