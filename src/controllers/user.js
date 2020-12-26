const UserServices = require('./../services/user');
const ResponseHandler = require('../utils/responseHandler');

const find = async (req, res) => {
  try {
    const payload = await UserServices.find(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const findById = async (req, res) => {
  try {
    const payload = await UserServices.findById(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const create = async (req, res) => {
  try {
    const payload = await UserServices.create(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const update = async (req, res) => {
  try {
    const payload = await UserServices.update(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const _delete = async (req, res) => {
  try {
    await UserServices.delete(req);
    return ResponseHandler.success(res, {});
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const login = async (req, res) => {
  try {
    const payload = await UserServices.login(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const getUserByToken = async (req, res) => {
  try {
    const payload = await UserServices.getUserByToken(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const loginFacebook = async (req, res) => {
  try {
    const payload = await UserServices.loginFacebook(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const loginGoogle = async (req, res) => {
  try {
    const payload = await UserServices.loginGoogle(req);
    return ResponseHandler.success(res, payload);
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
};

const UserControllers = {
  find,
  findById,
  create,
  update,
  delete: _delete,
  login,
  getUserByToken,
  loginFacebook,
  loginGoogle
}

module.exports = UserControllers
