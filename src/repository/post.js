const Model = require('../models/posts');

const find = async ({page, limit, keyword, type, category, hashtag}) => {
  try {
    let query = {}
    if (type) {query = {...query, type}}
    if (category) {query = {...query, category}}
    if (hashtag) {query = {...query, hashtags: hashtag}}
    if (keyword) {query = {
      ...query, 
      $or: [
        { title: new RegExp(keyword.toLowerCase(), 'i') },
        { subtitle: new RegExp(keyword.toLowerCase(), 'i') },
        { content: new RegExp(keyword.toLowerCase(), 'i') },
      ],}
    }
    return await Model.paginate(
      query,
      {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: 'user',
      },
    );
  } catch (error) {
    throw error;
  }
};

const findById = async (_id) => {
  try {
    const res = await Model.findOne({_id}).populate('user');
    if (res) {
      return res;
    } else {
      throw { message: 'NOT_FOUND' };
    }
  } catch (error) {
    throw error;
  }
}

const findByPublicId = async (publicId) => {
  try {
    const res = await Model.findOne({publicId}).populate('user');
    if (res) {
      return res;
    } else {
      throw { message: 'NOT_FOUND' };
    }
  } catch (error) {
    throw error;
  }
}

const findByIdOrPublicId = async (id) => {
  try {
    let res = null
    if (id.indexOf('-') >= 0) {
      // get by publicId
      res = await Model.findOne({publicId: id}).populate('user');
    } else {
      // get by id
      res = await Model.findOne({_id: id}).populate('user');
    }
    if (res) {
      return res;
    } else {
      throw { message: 'NOT_FOUND' };
    }
  } catch (error) {
    throw error;
  }
}

const create = async (model) => {
  try {
    const newModel = new Model(model);
    return await newModel
      .save()
      .then((res) => res.populate('user').execPopulate());
  } catch (error) {
    throw error;
  }
};

const update = async ({_id, data}) => {
  try {
    return await Model.findOneAndUpdate({ _id }, data, { new: true }).populate('user');
  } catch (error) {
    throw error;
  }
};

const _delete = async (_id) => {
  try {
    return await Model.findOneAndDelete({ _id });
  } catch (error) {
    throw error;
  }
};

const PostRepository = {
  find,
  findById,
  findByPublicId,
  findByIdOrPublicId,
  create,
  update,
  delete: _delete,
}

module.exports = PostRepository
