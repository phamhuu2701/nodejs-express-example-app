const { ErrorMessage } = require('../variables/errorMessage');
const Repository = require('./../repository/user');

module.exports.find = async (req) => {
  try {
    const { page, limit, keyword } = req.query;
    const _page = parseInt(page) || 1;
    const _limit = parseInt(limit) || 10;

    return await Repository.find(_page, _limit, keyword);
  } catch (error) {
    throw error;
  }
};

module.exports.create = async (req) => {
  try {
    const data = req.body;

    return await Repository.create(data);
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

module.exports.update = async (req) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;
    const {
      first_name,
      last_name,
      gender,
      address,
      birthday,
      avatar,
      cover,
    } = req.body;

    const data = {
      first_name,
      last_name,
      gender,
      address,
      birthday,
      avatar,
      cover,
    };

    let user = await Repository.getUserByToken(authorization);
    if (user) {
      if (JSON.stringify(data) !== '{}') {
        Object.keys(data).forEach((key) => {
          if (data[key]) {
            user[key] = data[key];
          }
        });

        return await Repository.update(id, user);
      } else {
        throw { message: ErrorMessage.NO_THING_TO_UPDATE };
      }
    } else {
      throw { message: ErrorMessage.NOT_FOUND };
    }
  } catch (error) {
    throw error;
  }
};

module.exports.delete = async (req) => {
  try {
    const { id } = req.params;

    return await Repository.delete(id);
  } catch (error) {
    throw error;
  }
};

module.exports.login = async (req) => {
  try {
    const { username, password } = req.body;
    console.log('req.body :>> ', req.body);

    return await Repository.login(username, password);
  } catch (error) {
    throw error;
  }
};

module.exports.getUserByToken = async (req) => {
  try {
    const { authorization } = req.headers;

    return await Repository.getUserByToken(authorization);
  } catch (error) {
    throw error;
  }
};

// module.exports.loginFacebook = async (req) => {
//   try {
//     const data = {
//       firstName: req.body.first_name,
//       lastName: req.body.last_name,
//       email: req.body.email,
//       password:
//         Math.random().toString(36).substring(7) +
//         Math.random().toString(36).substring(7),
//     };
//     return await Repository.loginFacebook(data);
//   } catch (error) {
//     throw error;
//   }
// };
