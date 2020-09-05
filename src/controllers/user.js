const Service = require("./../services/user");
const ResponseHandler = require("../utils/responseHandler");

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

module.exports.update = async (req, res) => {
  try {
    await Service.update(req);
    return ResponseHandler.success(res);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Service.delete(req);
    return ResponseHandler.success(res, 204);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const payload = await Service.login(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    console.log(error);
    return ResponseHandler.error(res, error);
  }
};

module.exports.getUserByToken = async (req, res) => {
  try {
    const payload = await Service.getUserByToken(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    console.log("error :>> ", error);
    return ResponseHandler.error(res, error, 404);
  }
};
