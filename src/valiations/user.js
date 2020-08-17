const response = require("./../utils/handleResponse");
const Error = require("./../utils/handleError");
const { errorMessage } = require("./../utils/variables");

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push(Error.error("email", errorMessage.FIELD_IS_REQUIRED));
  }
  if (!password) {
    errors.push(Error.error("password", errorMessage.FIELD_IS_REQUIRED));
  } else if (password.length < 8) {
    errors.push(Error.error("password", errorMessage.PASSWORD_INVALID));
  }

  if (errors.length > 0) {
    return response.error(res, errors);
  }
  next();
};
