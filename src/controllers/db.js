const response = require("../utils/handleResponse");
const Service = require("../services/db");

module.exports.create = async (req, res) => {
  console.log("Creating defaut database..");
  try {
    const payload = await Service.create();
    console.log("Create default database successfully!");
    return response.success(res, payload);
  } catch (error) {
    console.log("Create default database failed");
    return response.error(res, error);
  }
};
