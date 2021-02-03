/*
 * STATUS CODE:
 * 200 OK
 * 201 Created
 * 204 No Content
 * 304 Not Modified
 * 400 Bad Request
 * 401 Unauthorized
 * 403 Forbidden
 * 404 Not Found
 * 405 Method Not Allowed
 * 410 Gone
 * 415 Unsupported Media Type
 * 422 Unprocessable Entity
 * 429 Too Many Requests
 */

/**
 * @param {Object} res
 * @param {Object} error
 * @param {String} status
 */
const success = (res, payload, status = '') => {
  const response = {
    success: true,
    status,
    payload,
  };
  return res.json(response);
};

/**
 *
 * @param {Object} res
 * @param {Object} error
 * @param {String} status
 */
const error = (res, error, status = '') => {
  let response = {
    success: false,
    status,
    error: {
      ...error,
      message: error.message,
      code: error.code,
    },
  };
  return res.json(response);
};

const ResponseHandler = {
  success,
  error,
};

module.exports = ResponseHandler;
