const Model = require("../models/users");
const md5 = require("md5");

module.exports.create = async (model) => {
  try {
    model.password = md5(model.password);
    const newModel = new Model(model);
    return await newModel.save();
  } catch (error) {
    throw error;
  }
};

module.exports.find = async (page, limit, keyword) => {
  try {
    return await Model.paginate(
      { firstName: new RegExp(keyword) },
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
    return await Model.findById(id).populate("city");
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

module.exports.login = async (email, password) => {
  try {
    console.log("password :>> ", password);
    const passwordEncode = md5(password);
    console.log("passwordEncode :>> ", passwordEncode);
    return await Model.findOne({ email, password: passwordEncode });
  } catch (error) {
    throw error;
  }
};
