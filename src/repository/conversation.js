const Model = require("../models/conversations");

module.exports.create = async (model) => {
  try {
    const newModel = new Model(model);
    return await newModel.save();
  } catch (error) {
    throw error;
  }
};

module.exports.find = async (page, limit, user) => {
  try {
    let query = {};
    if (user) {
      query = {
        ...query,
        users: user,
      };
    }
    return await Model.paginate(query, {
      page,
      limit,
      sort: { createdAt: -1 },
      populate: "users",
    });
  } catch (error) {
    throw error;
  }
};

module.exports.findById = async (id) => {
  try {
    return await Model.findById(id).populate("users");
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
