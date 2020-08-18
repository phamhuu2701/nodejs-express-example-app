const Model = require("../models/posts");

module.exports.create = async (model) => {
  try {
    const newModel = new Model(model);
    return await newModel.save();
  } catch (error) {
    throw error;
  }
};

module.exports.find = async (page, limit, keyword) => {
  try {
    return await Model.paginate(
      { content: new RegExp(keyword) },
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

module.exports.findById = async (id) => {
  try {
    return await Model.findById(id).populate("user");
  } catch (error) {
    throw error;
  }
};

module.exports.update = async (id, data) => {
  try {
    return await Model.findByIdAndUpdate(id, data);
  } catch (error) {
    throw error;
  }
};

module.exports.delete = async (id) => {
  try {
    return await Model.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
