const Model = require("../models/cities");

module.exports.create = async (model) => {
  try {
    const newModel = new Model(model);
    return await newModel.save();
  } catch (error) {
    throw error;
  }
};

module.exports.find = async (keyword) => {
  try {
    return await Model.paginate(
      keyword ? { name: new RegExp(keyword.toLowerCase(), "i") } : {},
      {
        page: 1,
        limit: 100,
        sort: { createdAt: -1 },
      }
    );
  } catch (error) {
    throw error;
  }
};

module.exports.findById = async (id) => {
  try {
    return await Model.findById(id);
  } catch (error) {
    throw error;
  }
};
