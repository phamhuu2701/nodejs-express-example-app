const UserRepository = require("./../repositories/user");

module.exports.find = async (req) => {
  try {
    const { page, limit, keyword } = req.query;
    const _page = parseInt(page) || 1;
    const _limit = parseInt(limit) || 10;

    return await UserRepository.find(_page, _limit, keyword);
  } catch (error) {
    return error;
  }
};

module.exports.findById = async (req) => {
  try {
    const { id } = req.params;
    const _id = parseInt(id) || -1;

    return await UserRepository.findById(_id);
  } catch (error) {
    return error;
  }
};

module.exports.login = async (req) => {
  try {
    const { email, password } = req.body;

    return await UserRepository.login(email, password);
  } catch (error) {
    return error;
  }
};
