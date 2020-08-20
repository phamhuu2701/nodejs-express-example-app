const { ErrorMessage } = require("../utils/variables");

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return ErrorMessage.fieldIsRequired("email");
  }
  if (!password) {
    return ErrorMessage.fieldIsRequired("password");
  } else if (password.length < 8) {
    return ErrorMessage.fieldInvalid("password");
  }

  next();
};
