const ResponseHandler = require('../utils/responseHandler');
const Service = require('../services/productSize');

const create = async (req, res) => {
  try {
    const payload = await Service.create(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const find = async (req, res) => {
  try {
    const payload = await Service.find(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const findById = async (req, res) => {
  try {
    const payload = await Service.findById(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const update = async (req, res) => {
  try {
    const payload = await Service.update(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const _delete = async (req, res) => {
  try {
    await Service.delete(req);
    return ResponseHandler.success(res, {});
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

module.exports = {
  create,
  find,
  findById,
  update,
  delete: _delete,
};
