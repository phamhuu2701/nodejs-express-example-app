const env = process.env.ENV;
console.log("env :>> ", env);

let CONFIG = {};
CONFIG.ENV = process.env.ENV || "development";
CONFIG.HOST = process.env.HOST || "localhost";
CONFIG.POST = process.env.PORT || "3002";

// mongodb
CONFIG.MONGO_HOST = process.env.MONGO_HOST || "localhost";
CONFIG.MONGO_PORT = process.env.MONGO_PORT || 27017;
CONFIG.MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME || "haloha";
CONFIG.MONGO_DATABASE_USERNAME = process.env.MONGO_DATABASE_USERNAME || "";
CONFIG.MONGO_DATABASE_PASSWORD = process.env.MONGO_DATABASE_PASSWORD || "";
CONFIG.MONGO_URL =
  CONFIG.MONGO_DATABASE_USERNAME && CONFIG.MONGO_DATABASE_PASSWORD
    ? `mongodb://${CONFIG.MONGO_DATABASE_USERNAME}:${CONFIG.MONGO_DATABASE_PASSWORD}@${CONFIG.MONGO_HOST}:${CONFIG.MONGO_PORT}/${CONFIG.MONGO_DATABASE_NAME}?retryWrites=true`
    : `mongodb://${CONFIG.MONGO_HOST}:${CONFIG.MONGO_PORT}/${CONFIG.MONGO_DATABASE_NAME}?retryWrites=true`;

// jwt
CONFIG.JWT_EXPIRATION = parseInt(process.env.JWT_EXPIRATION) || 86400; // 1 day
CONFIG.JWT_SECRET =
  process.env.JWT_SECRET || "haloha-jwt-serect-ashd8721s-198xb12yy-q2v9q2yeq";

module.exports = CONFIG;
