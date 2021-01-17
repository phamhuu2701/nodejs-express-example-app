const ResponseHandler = require('../utils/responseHandler');
const Service = require('../services/db');

const create = async (req, res) => {
  try {
    const payload = await Service.create(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, { message: error.message });
  }
};

module.exports = {
  create,
};
