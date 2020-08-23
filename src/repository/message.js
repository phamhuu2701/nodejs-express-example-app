const Model = require("../models/messages");

module.exports.create = async (model) => {
  try {
    const newModel = new Model(model);
    return await newModel.save();
  } catch (error) {
    throw error;
  }
};

module.exports.find = async (page, limit, keyword, conversation) => {
  try {
    let query = {};
    if (keyword) {
      query = { ...query, content: new RegExp(keyword.toLowerCase(), "i") };
    }
    if (conversation) {
      query = { ...query, conversation };
    }
    return await Model.paginate(query, {
      page,
      limit,
      sort: { createdAt: -1 },
      populate: "user",
    });
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
    return await Model.findByIdAnddelete(id);
  } catch (error) {
    throw error;
  }
};
