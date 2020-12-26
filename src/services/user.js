const CONFIG = require('../config');
const CloudinaryUploader = require('../connector/coudinary');
const UserRepository = require('./../repository/user');

const find = async (req) => {
  try {
    const { page, limit, keyword } = req.query;

    let _page = parseInt(page) || 1;
    let _limit = parseInt(limit) || 20;

    return await UserRepository.find({page: _page, limit: _limit, keyword});
  } catch (error) {
    throw error;
  }
};

const findById = async (req) => {
  try {
    const { _id } = req.params;

    return await UserRepository.findById(_id);
  } catch (error) {
    throw error;
  }
};

const create = async (req) => {
  try {
    const data = req.body;

    return await UserRepository.create(data);
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const { authorization } = req.headers;
    const { 
      firstName, 
      lastName, 
      gender, 
      address, 
      birthday, 
      avatar, 
      cover 
    } = req.body;

    const fields = { 
      firstName, 
      lastName, 
      gender, 
      address, 
      birthday, 
      avatar, 
      cover 
    };

    let user = await UserRepository.getUserByToken(authorization);
    if (user) {
      let folderPath = 'haloha/uploads/'

      // destroy avatar
      if (fields.avatar && user.avatar && user.avatar != fields.avatar && user.avatar.indexOf(folderPath) >= 0) {
        let firstIndex = user.avatar.indexOf(folderPath)
        let lastIndex = user.avatar.lastIndexOf('.')
        let path = firstIndex >= 0 ? user.avatar.slice(firstIndex, lastIndex) : ''
        if (path) {
          let avatarDeleted = await CloudinaryUploader.destroy(path);
          console.log('avatarDeleted :>> ', avatarDeleted);
        }
      }

      // destroy cover
      if (fields.cover && user.cover && user.cover !== fields.cover && user.cover.indexOf(folderPath) >= 0) {
        let firstIndex = user.cover.indexOf(folderPath)
        let lastIndex = user.cover.lastIndexOf('.')
        let path = firstIndex >= 0 ? user.cover.slice(firstIndex, lastIndex) : ''
        if (path) {
          let coverDeleted = await CloudinaryUploader.destroy(path);
          console.log('coverDeleted :>> ', coverDeleted);
        }
      }

      let data = {};
      Object.keys(fields).forEach((key) => fields[key] ? (data[key] = fields[key]) : null);

      if (JSON.stringify(data) != '{}') {
        return await UserRepository.update({_id: user._id, data});
      } else {
        throw { message: 'NO_THING_TO_UPDATE' };
      }
    } else {
      throw { message: 'NOT_FOUND' };
    }
  } catch (error) {
    throw error;
  }
};

const _delete = async (req) => {
  try {
    const { _id } = req.body;

    return await UserRepository.delete(_id);
  } catch (error) {
    throw error;
  }
};

const login = async (req) => {
  try {
    const { username, password } = req.body;

    return await UserRepository.login({username, password});
  } catch (error) {
    throw error;
  }
};

const getUserByToken = async (req) => {
  try {
    const { authorization } = req.headers;

    return await UserRepository.getUserByToken(authorization);
  } catch (error) {
    throw error;
  }
};

const loginFacebook = async (req) => {
  try {
    const { fb } = req.body;
    let data = JSON.parse(fb)

    return await UserRepository.loginFacebook(data);
  } catch (error) {
    throw error;
  }
};

const loginGoogle = async (req) => {
  try {
    const { gg } = req.body;
    let data = JSON.parse(gg)

    return await UserRepository.loginGoogle(data);
  } catch (error) {
    throw error;
  }
};

const UserServices = {
  find,
  findById,
  create,
  update,
  delete: _delete,
  login,
  getUserByToken,
  loginFacebook,
  loginGoogle,
}

module.exports = UserServices
