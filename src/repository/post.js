const Model = require('../models/posts');

const find = async ({page, limit, keyword}) => {
  try {
    return await Model.paginate(
      keyword
        ? {
            $or: [
              { title: new RegExp(keyword.toLowerCase(), 'i') },
              { subtitle: new RegExp(keyword.toLowerCase(), 'i') },
              { content: new RegExp(keyword.toLowerCase(), 'i') },
            ],
          }
        : {},
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
    const res = await Model.findById(_id);
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
  create,
  update,
  delete: _delete,
}

module.exports = PostRepository
