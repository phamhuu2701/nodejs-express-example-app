const ResponseHandler = require('../utils/responseHandler');
const { validateEmail, formValidate } = require('../utils/formValidate');
const ErrorCode = require('../utils/errorCode');

const login = async (req, res, next) => {
  const { username, password } = req.body;

  const usernameValid = formValidate(username, { required: true });
  if (!usernameValid.success) {
    return ResponseHandler.error(res, { ...usernameValid.error, fieldName: 'username' });
  }

  const passwordValid = formValidate(password, { required: true, minlength: 8 });
  if (!passwordValid.success) {
    return ResponseHandler.error(res, { ...passwordValid.error, fieldName: 'password' });
  }

  next();
};

const authorization = async (req, res, next) => {
  const { authorization } = req.headers;

  const authorizationValid = formValidate(authorization, { required: true });
  if (!authorizationValid.success) {
    return ResponseHandler.error(res, {
      message: ErrorCode.UNAUTHORIZATION,
      code: ErrorCode.UNAUTHORIZATION,
    });
  }

  next();
};

module.exports = {
  login,
  authorization,
};
