const CloudinaryUploader = require('../connector/coudinary');
const ErrorCode = require('../utils/errorCode');
const Repository = require('./../repositories/user');

const create = async (req) => {
  try {
    const data = req.body;

    return await Repository.create(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const find = async (req) => {
  try {
    const { page, limit, keyword } = req.query;

    let _page = parseInt(page) || 1;
    let _limit = parseInt(limit < 100 ? limit : 100) || 20;

    return await Repository.find({ page: _page, limit: _limit, keyword });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findById = async (req) => {
  try {
    const { _id } = req.params;

    return await Repository.findById(_id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const update = async (req) => {
  try {
    const { authorization } = req.headers;
    const { firstName, lastName, gender, address, birthday, avatar, cover } = req.body;

    const fields = {
      firstName,
      lastName,
      gender,
      address,
      birthday,
      avatar,
      cover,
    };

    let user = await Repository.getUserByToken(authorization);
    if (user) {
      // destroy avatar
      if (
        fields.avatar &&
        user.avatar &&
        user.avatar != fields.avatar &&
        user.avatar.indexOf(folderPath) >= 0
      ) {
        let avatarDeleted = await CloudinaryUploader.destroy(user.avatar);
        console.log('avatarDeleted :>> ', avatarDeleted);
      }

      // destroy cover
      if (
        fields.cover &&
        user.cover &&
        user.cover !== fields.cover &&
        user.cover.indexOf(folderPath) >= 0
      ) {
        let coverDeleted = await CloudinaryUploader.destroy(user.cover);
        console.log('coverDeleted :>> ', coverDeleted);
      }

      let data = {};
      Object.keys(fields).forEach((key) => (fields[key] ? (data[key] = fields[key]) : null));

      if (JSON.stringify(data) != '{}') {
        return await Repository.update({ _id: user._id, data });
      } else {
        throw { message: ErrorCode.NOTHING_TO_UPDATE, code: ErrorCode.NOTHING_TO_UPDATE };
      }
    } else {
      throw { message: ErrorCode.UNAUTHORIZATION, code: ErrorCode.UNAUTHORIZATION };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const _delete = async (req) => {
  try {
    const { authorization } = req.headers;

    let user = await Repository.getUserByToken(authorization);
    if (user) {
      return await Repository.delete(user._id);
    } else {
      throw { message: ErrorCode.UNAUTHORIZATION, code: ErrorCode.UNAUTHORIZATION };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const login = async (req) => {
  try {
    const { username, password } = req.body;

    return await Repository.login({ username, password });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserByToken = async (req) => {
  try {
    const { authorization } = req.headers;

    return await Repository.getUserByToken(authorization);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginFacebook = async (req) => {
  try {
    const { fb } = req.body;
    let data = JSON.parse(fb);

    return await Repository.loginFacebook(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginGoogle = async (req) => {
  try {
    const { gg } = req.body;
    let data = JSON.parse(gg);

    return await Repository.loginGoogle(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  create,
  find,
  findById,
  update,
  delete: _delete,
  login,
  getUserByToken,
  loginFacebook,
  loginGoogle,
};
