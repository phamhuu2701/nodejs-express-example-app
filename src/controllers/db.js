const response = require("../utils/handleResponse");
const Service = require("../services/db");

module.exports.create = async (req, res) => {
  try {
    const payload = await Service.create();
    return response.success(res, payload);
  } catch (error) {
    return response.error(res, error);
  }
};
