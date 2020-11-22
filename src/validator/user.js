const ResponseHandler = require('../utils/responseHandler');
const { ErrorMessage } = require('../variables/errorMessage');

const UserRepository = require('./../repository/user');
const { formValidate } = require('./formValidate');

module.exports.create = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  const firstNameValid = formValidate(first_name, { required: true });
  if (!firstNameValid.success) {
    return ResponseHandler.error(
      res,
      { ...firstNameValid.error, field: 'first_name' },
      400,
    );
  }

  const lastNameValid = formValidate(last_name, { required: true });
  if (!lastNameValid.success) {
    return ResponseHandler.error(
      res,
      { ...lastNameValid.error, field: 'last_name' },
      400,
    );
  }

  const emailValid = formValidate(email, { required: true }, 'email');
  if (!emailValid.success) {
    return ResponseHandler.error(
      res,
      { ...emailValid.error, field: 'email' },
      400,
    );
  } else {
    const user = await UserRepository.findByEmail(email);
    if (user) {
      return ResponseHandler.error(
        res,
        {
          message: ErrorMessage.FIELD_VALUE_ALREADY_EXISTED,
          field: 'email',
        },
        400,
      );
    }
  }

  const passwordValid = formValidate(password, {
    required: true,
    minlength: 8,
  });
  if (!passwordValid.success) {
    return ResponseHandler.error(
      res,
      { ...passwordValid.error, field: 'password' },
      400,
    );
  }

  next();
};

module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const usernameValid = formValidate(username, { required: true });
  if (!usernameValid.success) {
    return ResponseHandler.error(
      res,
      { ...usernameValid.error, field: 'username' },
      400,
    );
  }

  const passwordValid = formValidate(password, {
    required: true,
    minlength: 8,
  });
  if (!passwordValid.success) {
    return ResponseHandler.error(
      res,
      { ...passwordValid.error, field: 'password' },
      400,
    );
  }

  next();
};

// module.exports.loginFacebook = async (req, res, next) => {
//   const { email } = req.body;

//   if (!email) {
//     return ResponseHandler.error(
//       res,
//       ErrorHandler.create(ErrorMessage.FIELD_IS_REQUIRED, 'email'),
//       400,
//     );
//   }

//   next();
// };

module.exports.authorization = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return ResponseHandler.error(
      res,
      { message: ErrorMessage.INVALID_TOKEN },
      400,
    );
  }

  next();
};
