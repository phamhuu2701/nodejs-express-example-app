const Service = require("../services/city");
const { ResponseHandler } = require("./../utils/responseHandler");

module.exports.find = async (req, res) => {
  try {
    const payload = await Service.find(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error, 404);
  }
};

module.exports.create = async (req, res) => {
  try {
    const payload = await Service.create(req);
    return ResponseHandler.success(res, payload, 201);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

module.exports.findById = async (req, res) => {
  try {
    const payload = await Service.findById(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error, 404);
  }
};
