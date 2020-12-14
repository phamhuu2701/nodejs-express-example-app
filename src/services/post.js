const Repository = require('../repository/post');
const UserRepository = require('../repository/user');
const convertPublicId = require('../utils/convertPublicId');
const removeVietnameseTones = require('../utils/removeVietnameseTones');
const { ErrorMessage } = require('../variables/errorMessage');

module.exports.find = async (req) => {
  try {
    const { page, limit, keyword, user } = req.query;

    const _page = parseInt(page) || 1;
    const _limit = parseInt(limit) || 10;

    return await Repository.find(_page, _limit, keyword, user);
  } catch (error) {
    throw error;
  }
};

module.exports.create = async (req) => {
  try {
    const { authorization } = req.headers;
    const data = req.body;

    let user = await UserRepository.getUserByToken(authorization);
    if (user) {
      data.user = user._id;

      let public_id = convertPublicId(removeVietnameseTones(data.title));
      data.public_id = public_id;

      return await Repository.create(data);
    } else {
      throw { message: ErrorMessage.UNAUTHORIZATION };
    }
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
      title,
      content,
      attachments,
      category,
      likes,
      comments,
      views_count,
      likes_count,
      comments_count,
      hashtags,
    } = req.body;

    let user = await UserRepository.getUserByToken(authorization);
    if (user) {
      if (String(user._id) === id) {
        const fields = {
          title,
          content,
          attachments,
          category,
          likes,
          comments,
          views_count,
          likes_count,
          comments_count,
          hashtags,
        };

        let data = {};
        Object.keys(fields).forEach((key) => {
          if (fields[key]) {
            data[key] = fields[key];

            if (key === 'title') {
              let public_id = convertPublicId(
                removeVietnameseTones(fields[key]),
              );
              data.public_id = public_id;
            }
          }
        });

        if (JSON.stringify(data) !== '{}') {
          return await Repository.update(id, data);
        } else {
          throw { message: ErrorMessage.NO_THING_TO_UPDATE };
        }
      } else {
        throw { message: ErrorMessage.ACCESS_DENIED };
      }
    } else {
      throw { message: ErrorMessage.UNAUTHORIZATION };
    }
  } catch (error) {
    throw error;
  }
};

module.exports.delete = async (req) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;

    const post = await Repository.findById(id);
    if (post) {
      const user = await UserRepository.getUserByToken(authorization);
      if (user) {
        if (String(user._id) === String(post.user._id)) {
          return await Repository.delete(id);
        } else {
          throw { message: ErrorMessage.ACCESS_DENIED };
        }
      } else {
        throw { message: ErrorMessage.UNAUTHORIZATION };
      }
    } else {
      throw { message: ErrorMessage.NOT_POST_FOUND };
    }
  } catch (error) {
    throw error;
  }
};
