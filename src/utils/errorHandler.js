const { ErrorMessage } = require("./variables");

/**
 * @param {String} errorCode
 * @param {String} errorField
 */
module.exports.create = (errorCode = "", errorField = "") => {
  return { errorCode, errorMessage: ErrorMessage[errorCode], errorField };
};
