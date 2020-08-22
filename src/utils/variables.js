module.exports.ErrorCode = {
  FIELD_IS_REQUIRED: "FIELD_IS_REQUIRED",
  FIELD_INVALID: "FIELD_INVALID",
  EMAIL_OR_PASSWORD_INCORRECT: "EMAIL_OR_PASSWORD_INCORRECT",
  INVALID_TOKEN: "INVALID_TOKEN",
  UNAUTHORIZATION: "UNAUTHORIZATION",
};

module.exports.ErrorMessage = {
  [this.ErrorCode.FIELD_IS_REQUIRED]: "Field is required",
  [this.ErrorCode.FIELD_INVALID]: "Field invalid",
  [this.ErrorCode.EMAIL_OR_PASSWORD_INCORRECT]: "Email or Password incorrect",
  [this.ErrorCode.INVALID_TOKEN]: "INVALID_TOKEN",
  [this.ErrorCode.UNAUTHORIZATION]: "UNAUTHORIZATION",
};
