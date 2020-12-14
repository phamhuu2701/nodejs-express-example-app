const ResponseHandler = require('../utils/responseHandler');
const { formValidate } = require('../utils/formValidate');

module.exports.create = async (req, res, next) => {
  const { title, content } = req.body;

  const titleValid = formValidate(title, { required: true });
  if (!titleValid.success) {
    return ResponseHandler.error(res, {
      ...titleValid.error,
      field: 'title',
    });
  }

  const contentValid = formValidate(content, { required: true });
  if (!contentValid.success) {
    return ResponseHandler.error(res, {
      ...contentValid.error,
      field: 'content',
    });
  }

  next();
};
