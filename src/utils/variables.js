const ErrorCode = {
  FIELD_IS_REQUIRED: "FIELD_IS_REQUIRED",
  FIELD_INVALID: "FIELD_INVALID",
  EMAIL_OR_PASSWORD_INCORRECT: "EMAIL_OR_PASSWORD_INCORRECT",
  INVALID_TOKEN: "INVALID_TOKEN",
  UNAUTHORIZATION: "UNAUTHORIZATION",
};

const ErrorMessage = {
  [ErrorCode.FIELD_IS_REQUIRED]: "Field is required",
  [ErrorCode.FIELD_INVALID]: "Field invalid",
  [ErrorCode.EMAIL_OR_PASSWORD_INCORRECT]: "Email or Password incorrect",
  [ErrorCode.INVALID_TOKEN]: "INVALID_TOKEN",
  [ErrorCode.UNAUTHORIZATION]: "UNAUTHORIZATION",
};

module.exports = {
  ErrorCode,
  ErrorMessage,
};
