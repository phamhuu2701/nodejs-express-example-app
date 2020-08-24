const Model = require("../models/cities");

module.exports.find = async (page, limit, keyword) => {
  try {
    return await Model.paginate(
      keyword ? { name: new RegExp(keyword.toLowerCase(), "i") } : {},
      {
        page,
        limit,
        sort: { createdAt: -1 },
      }
    );
  } catch (error) {
    throw error;
  }
};

module.exports.create = async (model) => {
  try {
    const newModel = new Model(model);
    return await newModel.save();
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
