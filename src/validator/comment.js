const { ErrorCode } = require("../utils/variables");
const { ResponseHandler } = require("../utils/responseHandler");
const { ErrorHandler } = require("../utils/errorHandler");

module.exports.create = async (req, res, next) => {
  const { content } = req.body;

  if (!content) {
    return ResponseHandler.error(
      res,
      ErrorHandler.create(ErrorCode.FIELD_IS_REQUIRED, "content"),
      400
    );
  }

  next();
};
