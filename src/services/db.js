const Repository = require('../repositories/db');

const create = async (req) => {
  try {
    return await Repository.create();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
};
