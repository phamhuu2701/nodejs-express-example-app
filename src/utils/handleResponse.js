/**
 * @param {Object} res
 * @param {Object} payload
 */
module.exports.success = (res, payload) => {
  const response = {
    success: true,
    payload,
  };
  return res.status(200).json(response);
};

/**
 * @param {Object} res
 * @param {Array} errors
 */
module.exports.error = (res, errors) => {
  const response = {
    success: false,
    errors,
  };
  return res.status(500).json(response);
};
