const ResponseHandler = require('../utils/responseHandler');
const { validateEmail, formValidate } = require('../utils/formValidate');
const ErrorCode = require('../utils/errorCode');

const create = async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  if (!email && !phoneNumber) {
    return ResponseHandler.error(res, {
      message: ErrorCode.EMAIL_OR_PHONE_NUMBER_IS_REQUIRED,
      code: ErrorCode.EMAIL_OR_PHONE_NUMBER_IS_REQUIRED,
    });
  }

  const firstNameValid = formValidate(firstName, { required: true });
  if (!firstNameValid.success) {
    return ResponseHandler.error(res, { ...firstNameValid.error, fieldName: 'firstName' });
  }

  const lastNameValid = formValidate(lastName, { required: true });
  if (!lastNameValid.success) {
    return ResponseHandler.error(res, { ...lastNameValid.error, fieldName: 'lastName' });
  }

  let emailValid = formValidate(email, { required: true });
  if (!emailValid.success) {
    return ResponseHandler.error(res, { ...emailValid.error, fieldName: 'email' });
  } else {
    emailValid = validateEmail(email);
    if (!emailValid.success) {
      return ResponseHandler.error(res, emailValid.error);
    }
  }

  const passwordValid = formValidate(password, { required: true, minlength: 8 });
  if (!passwordValid.success) {
    return ResponseHandler.error(res, { ...passwordValid.error, fieldName: 'password' });
  }

  next();
};

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
  create,
  login,
  authorization,
};
