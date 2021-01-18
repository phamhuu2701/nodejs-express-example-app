const Model = require('../models/products');
const ErrorCode = require('../utils/errorCode');

const create = async (model) => {
  try {
    const newModel = new Model(model);
    return await newModel.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const find = async ({ page, limit, keyword, vendor }) => {
  try {
    let query = {};
    if (keyword) {
      query = {
        ...query,
        $or: [
          { title: new RegExp(keyword.toLowerCase(), 'i') },
          { description: new RegExp(keyword.toLowerCase(), 'i') },
        ],
      };
    }
    if (vendor) {
      query = { ...query, vendor: new RegExp(vendor.toLowerCase(), 'i') };
    }

    return await Model.paginate(query, {
      page,
      limit,
      sort: { createdAt: -1 },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findById = async (_id) => {
  try {
    const res = await Model.findById(_id);
    if (res) {
      return res;
    } else {
      throw { message: ErrorCode.NOT_FOUND, code: ErrorCode.NOT_FOUND };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const update = async ({ _id, data }) => {
  try {
    return await Model.findOneAndUpdate({ _id }, data, { new: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const _delete = async (_id) => {
  try {
    return await Model.findOneAndDelete({ _id });
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
