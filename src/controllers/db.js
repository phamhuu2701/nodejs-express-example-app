const DBServices = require('../services/db');
const ResponseHandler = require('../utils/responseHandler');

const create = async (req, res) => {
  try {
    const payload = await DBServices.create(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, {message: error.message});
  }
};

const DBControllers = {
  create
}

module.exports = DBControllers
