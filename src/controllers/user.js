const response = require("./../utils/handleResponse");
const UserService = require("./../services/user");

module.exports.find = async (req, res) => {
  try {
    const payload = await UserService.find(req);
    return response.success(res, payload);
  } catch (error) {
    return response.error(res);
  }
};

module.exports.findById = async (req, res) => {
  try {
    const payload = await UserService.findById(req);
    return response.success(res, payload);
  } catch (error) {
    return response.error(res, error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const payload = await UserService.login(req);
    return response.success(res, payload);
  } catch (error) {
    return response.error(res, error);
  }
};
