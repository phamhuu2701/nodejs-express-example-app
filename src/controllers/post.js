const PostServices = require('../services/post');
const ResponseHandler = require('../utils/responseHandler');

const find = async (req, res) => {
  try {
    const payload = await PostServices.find(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const findById = async (req, res) => {
  try {
    const payload = await PostServices.findById(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const findByPublicId = async (req, res) => {
  try {
    const payload = await PostServices.findByPublicId(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const findByIdOrPublicId = async (req, res) => {
  try {
    const payload = await PostServices.findByIdOrPublicId(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const create = async (req, res) => {
  try {
    const payload = await PostServices.create(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const update = async (req, res) => {
  try {
    const payload = await PostServices.update(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const _delete = async (req, res) => {
  try {
    await PostServices.delete(req);
    return ResponseHandler.success(res);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const PostControllers = {
  find,
  findById,
  findByPublicId,
  findByIdOrPublicId,
  create,
  update,
  delete: _delete,
}

module.exports = PostControllers
