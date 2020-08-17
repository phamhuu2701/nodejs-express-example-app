/**
 * @param {String} type
 * @param {String} msg
 */
module.exports.error = (field = "unknow", message) => {
  return { field, message };
};
