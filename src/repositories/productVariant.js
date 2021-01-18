const Model = require('../models/productVariants');
const ErrorCode = require('../utils/errorCode');

const create = async (model) => {
  try {
    const newModel = new Model(model);
    return await newModel
      .save()
      .populated('product')
      .populated('productColor')
      .populated('productSize')
      .populated('productStyle')
      .populated('productMaterial');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const find = async ({ page, limit, keyword }) => {
  try {
    return await Model.paginate(
      {},
      {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: ['product', 'productColor', 'productSize', 'productMaterial', 'productStyle'],
      },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findById = async (_id) => {
  try {
    const res = await Model.findById(_id)
      .populated('product')
      .populated('productColor')
      .populated('productSize')
      .populated('productStyle')
      .populated('productMaterial');
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
    return await Model.findOneAndUpdate({ _id }, data, { new: true })
      .populated('product')
      .populated('productColor')
      .populated('productSize')
      .populated('productStyle')
      .populated('productMaterial');
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
