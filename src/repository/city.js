const Model = require("../models/cities");

module.exports.create = async (model) => {
  try {
    const newModel = new Model(model);
    return await newModel.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.find = async (page, limit, keyword) => {
  try {
    return await Model.paginate(keyword ? { name: new RegExp(keyword) } : {}, {
      page,
      limit,
      sort: { createdAt: -1 },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.findById = async (id) => {
  try {
    return await Model.findById(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
