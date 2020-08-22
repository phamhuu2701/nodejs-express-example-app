const { ErrorMessage } = require("./variables");

/**
 * @param {String} errorCode
 * @param {String} errorField
 */
const create = (errorCode = "", errorField = "") => {
  return { errorCode, errorMessage: ErrorMessage[errorCode], errorField };
};

module.exports.ErrorHandler = {
  create,
};
