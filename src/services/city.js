const Repository = require("../repository/city");

module.exports.create = async (req) => {
  try {
    const data = req.body;

    return await Repository.create(data);
  } catch (error) {
    throw error;
  }
};

module.exports.find = async (req) => {
  try {
    const { keyword } = req.query;

    return await Repository.find(keyword);
  } catch (error) {
    throw error;
  }
};

module.exports.findById = async (req) => {
  try {
    const { id } = req.params;

    return await Repository.findById(id);
  } catch (error) {
    throw error;
  }
};
