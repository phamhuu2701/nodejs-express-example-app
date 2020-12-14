const DBRepository = require('../repository/db');

const create = async (req) => {
  try {
    return await DBRepository.create()
  } catch (error) {
    console.log('DB create failed');
    console.log(error);
    throw error;
  }
};

const DBServices = {
  create,
}

module.exports = DBServices