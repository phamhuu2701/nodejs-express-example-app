/**
 *
 * @param {String} str
 * @param {Number} length
 */
const convertPublicId = (str, length = 60) => {
  if (str) {
    let _str = str.trim().replace(/\s/g, '-').replace(/---+/g, '-').replace(/--+/g, '-');
    let __str = _str.substring(0, length).toLowerCase() + '-' + Date.now();
    return __str;
  }
  return '';
};

module.exports = convertPublicId;
