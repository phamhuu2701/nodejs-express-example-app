const Model = require('../models/posts');

module.exports.find = async (page, limit, keyword, user) => {
  try {
    let query = {};
    if (keyword) {
      query = { ...query, content: new RegExp(keyword.toLowerCase(), 'i') };
    }
    if (user) {
      query = { ...query, user };
    }
    return await Model.paginate(query, {
      page,
      limit,
      sort: { createdAt: -1 },
      populate: 'user',
    });
  } catch (error) {
    throw error;
  }
};

module.exports.create = async (model) => {
  try {
    const newModel = new Model(model);
    return await newModel
      .save()
      .then((res) => res.populate('user').execPopulate());
  } catch (error) {
    throw error;
  }
};
module.exports.findById = async (id) => {
  try {
    return await Model.findById(id).populate('user');
  } catch (error) {
    throw error;
  }
};

module.exports.update = async (id, data) => {
  try {
    return await Model.findOneAndUpdate({ _id: id }, data, {
      new: true,
    }).populate('user');
  } catch (error) {
    throw error;
  }
};

module.exports.delete = async (id) => {
  try {
    return await Model.findOneAndDelete({ _id: id });
  } catch (error) {
    throw error;
  }
};
