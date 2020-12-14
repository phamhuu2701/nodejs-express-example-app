/**
 *
 * @param {String} str
 */
const convertPublicId = (str) => {
  if (str) {
    let _str = str
      .trim()
      .replace(/\s/g, '-')
      .replace(/---+/g, '-')
      .replace(/--+/g, '-');
    let __str = _str.substring(0, 40).toLowerCase() + '-' + Date.now();
    return __str;
  }
  return '';
};

module.exports = convertPublicId;
