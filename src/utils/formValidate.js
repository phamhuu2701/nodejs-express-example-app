const ErrorCode = require('./errorCode');

const VALILDATE_ERROR = {
  required: {
    validate_type: 'required',
    message: ErrorCode.FIELD_IS_REQUIRED,
    code: ErrorCode.FIELD_IS_REQUIRED,
  },
  min: {
    validate_type: 'min',
    message: ErrorCode.FIELD_INVALID,
    code: ErrorCode.FIELD_INVALID,
  },
  max: {
    validate_type: 'max',
    message: ErrorCode.FIELD_INVALID,
    code: ErrorCode.FIELD_INVALID,
  },
  minlength: {
    validate_type: 'minlength',
    message: ErrorCode.FIELD_INVALID,
    code: ErrorCode.FIELD_INVALID,
  },
  maxlength: {
    validate_type: 'maxlength',
    message: ErrorCode.FIELD_INVALID,
    code: ErrorCode.FIELD_INVALID,
  },
  pattern: {
    validate_type: 'pattern',
    message: ErrorCode.FIELD_INVALID,
    code: ErrorCode.FIELD_INVALID,
  },
};

const VALIDATE_RESPONSE = {
  success: () => ({ success: true }),
  error: (error) => ({ success: false, error }),
};

/**
 *
 * @param {any} value
 */
module.exports.validateEmail = (value) => {
  const rex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return rex.test(value)
    ? { success: true }
    : {
        success: false,
        error: {
          validate_type: 'email',
          message: ErrorCode.FIELD_INVALID,
          code: ErrorCode.FIELD_INVALID,
        },
      };
};

/**
 *
 * @param {any} value
 */
module.exports.validatePhoneNumber = (value) => {
  return Boolean(value)
    ? { success: true }
    : {
        success: false,
        error: {
          validate_type: 'tel',
          message: ErrorCode.FIELD_INVALID,
          code: ErrorCode.FIELD_INVALID,
        },
      };
};

/**
 *
 * @param {any} value
 * @param {object} options { required: boolean, min: number, max: number, minlength: number, maxlength: number, pattern: null }
 */
module.exports.formValidate = (value, options) => {
  try {
    // check options
    if ('required' in options && !value) {
      return VALIDATE_RESPONSE.error(VALILDATE_ERROR.required);
    }
    if ('min' in options && (typeof value !== 'number' || value < options.min)) {
      return VALIDATE_RESPONSE.error(VALILDATE_ERROR.min);
    }
    if ('max' in options && (typeof value !== 'number' || value > options.max)) {
      return VALIDATE_RESPONSE.error(VALILDATE_ERROR.max);
    }
    if ('minlength' in options && (typeof value !== 'string' || value.length < options.minlength)) {
      return VALIDATE_RESPONSE.error(VALILDATE_ERROR.minlength);
    }
    if ('maxlength' in options && (typeof value !== 'string' || value.length > options.maxlength)) {
      return VALIDATE_RESPONSE.error(VALILDATE_ERROR.maxlength);
    }
    if ('pattern' in options && options.pattern instanceof RegExp && !options.pattern.test(value)) {
      return VALIDATE_RESPONSE.error(VALILDATE_ERROR.pattern);
    }

    return VALIDATE_RESPONSE.success();
  } catch (error) {
    return VALIDATE_RESPONSE.error({ message: error.message });
  }
};
