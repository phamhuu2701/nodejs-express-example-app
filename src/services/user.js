const UserRepository = require("./../repository/user");
const Error = require("../utils/handleError");
const { ErrorMessage } = require("./../utils/variables");

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

    const payload = await UserRepository.login(email, password);
    if (Object.keys(payload).length === 0) {
      return Promise.reject(
        Error.create(ErrorMessage.EMAIL_OR_PASSWORD_INCORRECT)
      );
    }
    return payload;
  } catch (error) {
    return error;
  }
};
