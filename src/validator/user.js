const { ErrorCode } = require("../utils/variables");
const { ErrorHandler } = require("../utils/errorHandler");
const ResponseHandler = require("../utils/responseHandler");

const UserRepository = require("./../repository/user");

module.exports.create = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName) {
    return ResponseHandler.error(
      res,
      ErrorHandler.create(ErrorCode.FIELD_IS_REQUIRED, "firstName"),
      400
    );
  }
  if (!lastName) {
    return ResponseHandler.error(
      res,
      ErrorHandler.create(ErrorCode.FIELD_IS_REQUIRED, "lastName"),
      400
    );
  }
  if (!email) {
    return ResponseHandler.error(
      res,
      ErrorHandler.create(ErrorCode.FIELD_IS_REQUIRED, "email"),
      400
    );
  } else {
    const user = await UserRepository.findByEmail(email);
    if (user) {
      return ResponseHandler.error(
        res,
        ErrorHandler.create(ErrorCode.EMAIL_EXISTS, "email"),
        400
      );
    }
  }
  if (!password) {
    return ResponseHandler.error(
      res,
      ErrorHandler.create(ErrorCode.FIELD_IS_REQUIRED, "password"),
      400
    );
  } else if (password.length < 8) {
    return ResponseHandler.error(
      res,
      ErrorHandler.create(ErrorCode.FIELD_INVALID, "password"),
      400
    );
  }

  next();
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return ResponseHandler.error(
      res,
      ErrorHandler.create(ErrorCode.FIELD_IS_REQUIRED, "email"),
      400
    );
  }
  if (!password) {
    return ResponseHandler.error(
      res,
      ErrorHandler.create(ErrorCode.FIELD_IS_REQUIRED, "password"),
      400
    );
  } else if (password.length < 8) {
    return ResponseHandler.error(
      res,
      ErrorHandler.create(ErrorCode.FIELD_INVALID, "password"),
      400
    );
  }

  next();
};

module.exports.loginFacebook = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return ResponseHandler.error(
      res,
      ErrorHandler.create(ErrorCode.FIELD_IS_REQUIRED, "email"),
      400
    );
  }

  next();
};

module.exports.authorization = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return ResponseHandler.error(
      res,
      ErrorHandler.create(ErrorCode.INVALID_TOKEN),
      400
    );
  }

  next();
};
