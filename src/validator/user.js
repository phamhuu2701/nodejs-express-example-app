const ResponseHandler = require('../utils/responseHandler');
const { validateEmail, formValidate } = require('../utils/formValidate');
const { ErrorMessage } = require('../variables/errorMessage');

module.exports.create = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  console.log('req.body :>> ', req.body);

  const firstNameValid = formValidate(first_name, { required: true });
  if (!firstNameValid.success) {
    return ResponseHandler.error(res, {
      ...firstNameValid.error,
      field: 'first_name',
    });
  }

  const lastNameValid = formValidate(last_name, { required: true });
  if (!lastNameValid.success) {
    return ResponseHandler.error(res, {
      ...lastNameValid.error,
      field: 'last_name',
    });
  }

  let emailValid = formValidate(email, { required: true });
  if (!emailValid.success) {
    return ResponseHandler.error(res, { ...emailValid.error, field: 'email' });
  } else {
    emailValid = validateEmail(email);
    if (!emailValid.success) {
      return ResponseHandler.error(res, emailValid.error);
    }
  }

  const passwordValid = formValidate(password, {
    required: true,
    minlength: 8,
  });
  if (!passwordValid.success) {
    return ResponseHandler.error(res, {
      ...passwordValid.error,
      field: 'password',
    });
  }

  next();
};

module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const usernameValid = formValidate(username, { required: true });
  if (!usernameValid.success) {
    return ResponseHandler.error(res, {
      ...usernameValid.error,
      field: 'username',
    });
  }

  const passwordValid = formValidate(password, {
    required: true,
    minlength: 8,
  });
  if (!passwordValid.success) {
    return ResponseHandler.error(res, {
      ...passwordValid.error,
      field: 'password',
    });
  }

  next();
};

module.exports.authorization = async (req, res, next) => {
  const { authorization } = req.headers;

  const authorizationValid = formValidate(authorization, { required: true });
  if (!authorizationValid.success) {
    return ResponseHandler.error(res, {
      message: ErrorMessage.UNAUTHORIZATION,
    });
  }

  next();
};

// module.exports.loginFacebook = async (req, res, next) => {
//   const { email } = req.body;

//   if (!email) {
//     return ResponseHandler.error(
//       res,
//       ErrorHandler.create(ErrorMessage.FIELD_IS_REQUIRED, 'email'),
//     );
//   }

//   next();
// };
