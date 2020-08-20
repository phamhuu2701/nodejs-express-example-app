const Repository = require("./../repository/user");
const { ErrorCode } = require("./../utils/variables");
const ErrorHandler = require("./../utils/errorHandler");

module.exports.create = async (req) => {
  try {
    const data = req.body;

    return await Repository.create(data);
  } catch (error) {
    throw error;
  }
};

module.exports.find = async (req) => {
  try {
    const { page, limit, keyword } = req.query;
    const _page = parseInt(page) || 1;
    const _limit = parseInt(limit) || 10;

    return await Repository.find(_page, _limit, keyword);
  } catch (error) {
    throw error;
  }
};

module.exports.findById = async (req) => {
  try {
    const { id } = req.params;

    return await Repository.findById(id);
  } catch (error) {
    throw error;
  }
};

module.exports.update = async (req) => {
  try {
    const { id } = req.params;
    const data = req.body;

    return await Repository.update(id, data);
  } catch (error) {
    throw error;
  }
};

module.exports.delete = async (req) => {
  try {
    const { id } = req.params;

    return await Repository.delete(id);
  } catch (error) {
    throw error;
  }
};

module.exports.login = async (req) => {
  try {
    const { email, password } = req.body;

    return await Repository.login(email, password);
  } catch (error) {
    throw error;
  }
};

module.exports.getProfile = async (req) => {
  try {
    const token = req.headers && req.headers.authorization;
    if (token) {
      return await Repository.getProfile(token);
    } else {
      return Promise.reject(ErrorHandler.create(ErrorCode.NO_TOKEN_PROVIDER));
    }
  } catch (error) {
    throw error;
  }
};
