const Repository = require('../repositories/productVariant');
const UserRepository = require('../repositories/user');
const ErrorCode = require('../utils/errorCode');

const create = async (req) => {
  try {
    const { authorization } = req.headers;
    const data = req.body;

    let user = await UserRepository.getUserByToken(authorization);
    if (user && user.role === 'ADMIN') {

      return await Repository.create(data);
    } else {
      throw { message: ErrorCode.UNAUTHORIZATION, code: ErrorCode.UNAUTHORIZATION };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const find = async (req) => {
  try {
    const { page, limit, keyword } = req.query;

    let _page = parseInt(page) || 1;
    let _limit = parseInt(limit < 100 ? limit : 100) || 20;

    return await Repository.find({ page: _page, limit: _limit, keyword });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findById = async (req) => {
  try {
    const { _id } = req.params;

    return await Repository.findById(_id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const update = async (req) => {
  try {
    const { authorization } = req.headers;
    const { _id, amount, sold, price } = req.body;

    let user = await UserRepository.getUserByToken(authorization);
    if (user && user.role === 'ADMIN') {
      const fields = { amount, sold, price };

      let data = {};
      Object.keys(fields).forEach((key) => (fields[key] ? (data[key] = fields[key]) : null));

      if (JSON.stringify(data) != '{}') {
        return await Repository.update({ _id, data });
      } else {
        throw { message: ErrorCode.NOTHING_TO_UPDATE };
      }
    } else {
      throw { message: ErrorCode.UNAUTHORIZATION, code: ErrorCode.UNAUTHORIZATION };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const _delete = async (req) => {
  try {
    const { authorization } = req.headers;
    const { _id } = req.body;

    let user = await UserRepository.getUserByToken(authorization);
    if (user && user.role === 'ADMIN') {

      return await Repository.delete(_id);
    } else {
      throw { message: ErrorCode.UNAUTHORIZATION, code: ErrorCode.UNAUTHORIZATION };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  create,
  find,
  findById,
  update,
  delete: _delete,
};