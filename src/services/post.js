const PostRepository = require('../repository/post');
const UserRepository = require('../repository/user');
const convertPublicId = require('../utils/convertPublicId');
const removeVietnameseTones = require('../utils/removeVietnameseTones');

const find = async (req) => {
  try {
    const { page, limit, keyword, type, category } = req.query;

    let _page = parseInt(page) || 1;
    let _limit = parseInt(limit) || 20;
    let _category = category 
      ? category === 'all' 
        ? '' 
        : category 
      : ''
    let _type = type || 'post'

    return await PostRepository.find({page: _page, limit: _limit, keyword, type: _type, category: _category});
  } catch (error) {
    throw error;
  }
};

const findById = async (req) => {
  try {
    const { _id } = req.params;

    return await PostRepository.findById(_id);
  } catch (error) {
    throw error;
  }
};

const findByPublicId = async (req) => {
  try {
    const { publicId } = req.params;

    return await PostRepository.findByPublicId(publicId);
  } catch (error) {
    throw error;
  }
};

const findByIdOrPublicId = async (req) => {
  try {
    const { id } = req.params;

    return await PostRepository.findByIdOrPublicId(id);
  } catch (error) {
    throw error;
  }
};

const create = async (req) => {
  try {
    const { authorization } = req.headers;
    const data = req.body;

    let user = await UserRepository.getUserByToken(authorization);
    if (user) {
      data.user = user._id;

      let publicId = convertPublicId(removeVietnameseTones(data.title));
      data.publicId = publicId;

      return await PostRepository.create(data);
    } else {
      throw { message: 'UNAUTHORIZATION' };
    }
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const { authorization } = req.headers;
    const {
      _id,
      title,
      subtitle,
      content,
      category,
      attachments,
      hashtags,
      likes,
      shares,
      comments,
      views,
    } = req.body;

    let user = await UserRepository.getUserByToken(authorization);
    if (user) {
      let post = await PostRepository.findById(_id);
      if (post) {
        if (String(user._id) === String(post.user._id)) {
          const fields = {
            title,
            subtitle,
            content,
            category,
            attachments,
            hashtags,
            likes,
            shares,
            comments,
            views,
          };
  
          let data = {};
          Object.keys(fields).forEach((key) => {
            if (fields[key]) {
              data[key] = fields[key];
            }
          });
  
          if (JSON.stringify(data) !== '{}') {
            return await PostRepository.update({_id, data});
          } else {
            throw { message: 'NO_THING_TO_UPDATE' };
          }
        } else {
          throw { message: 'NOT_FOUND' };
        }
      } else {
        throw { message: 'NOT_FOUND' };
      }
    } else {
      throw { message: 'UNAUTHORIZATION' };
    }
  } catch (error) {
    throw error;
  }
};

const _delete = async (req) => {
  try {
    const { authorization } = req.headers;
    const { _id } = req.body;

    const post = await PostRepository.findById(_id);
    if (post) {
      const user = await UserRepository.getUserByToken(authorization);
      if (user) {
        if (String(user._id) === String(post.user._id)) {
          return await PostRepository.delete(_id);
        } else {
          throw { message: 'UNAUTHORIZATION' };
        }
      } else {
        throw { message: 'UNAUTHORIZATION' };
      }
    } else {
      throw { message: 'NOT_FOUND' };
    }
  } catch (error) {
    throw error;
  }
};

const PostServices = {
  find,
  findById,
  findByPublicId,
  findByIdOrPublicId,
  create,
  update,
  delete: _delete,
}

module.exports = PostServices
