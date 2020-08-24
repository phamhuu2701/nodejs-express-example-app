const Repository = require("../repository/post");

module.exports.find = async (req) => {
  try {
    const { page, limit, keyword, user } = req.query;
    const _page = parseInt(page) || 1;
    const _limit = parseInt(limit) || 10;

    return await Repository.find(_page, _limit, keyword, user);
  } catch (error) {
    throw error;
  }
};

module.exports.create = async (req) => {
  try {
    const data = req.body;

    return await Repository.create(data);
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

module.exports.updateUnauthorization = async (req) => {
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
