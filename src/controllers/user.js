const response = require("./../utils/handleResponse");
const Service = require("./../services/user");

module.exports.create = async (req, res) => {
  try {
    const payload = await Service.create(req);
    return response.success(res, payload);
  } catch (error) {
    return response.error(res, error);
  }
};

module.exports.find = async (req, res) => {
  try {
    const payload = await Service.find(req);
    return response.success(res, payload);
  } catch (error) {
    return response.error(res, error);
  }
};

module.exports.findById = async (req, res) => {
  try {
    const payload = await Service.findById(req);
    return response.success(res, payload);
  } catch (error) {
    return response.error(res, error);
  }
};

module.exports.update = async (req, res) => {
  try {
    await Service.update(req);
    return response.success(res);
  } catch (error) {
    return response.error(res, error);
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Service.delete(req);
    return response.success(res);
  } catch (error) {
    return response.error(res, error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const payload = await Service.login(req);
    return response.success(res, payload);
  } catch (error) {
    return response.error(res, error);
  }
};
