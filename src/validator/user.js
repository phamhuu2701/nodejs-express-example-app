const response = require("../utils/handleResponse");
const Error = require("../utils/handleError");
const { ErrorMessage } = require("../utils/variables");

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let errors = [];
  if (!email) {
    errors.push(Error.create(ErrorMessage.FIELD_IS_REQUIRED, "email"));
  }
  if (!password) {
    errors.push(Error.create(ErrorMessage.FIELD_IS_REQUIRED, "password"));
  } else if (password.length < 8) {
    errors.push(Error.create(ErrorMessage.PASSWORD_INVALID, "password"));
  }

  if (errors.length > 0) {
    return response.error(res, errors);
  }

  next();
};
