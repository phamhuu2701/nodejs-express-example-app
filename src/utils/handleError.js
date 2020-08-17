/**
 * @param {String} type
 * @param {String} msg
 */
module.exports.create = (message, field) => {
  return { field, message };
};
