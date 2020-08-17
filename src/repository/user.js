const dbUsers = require("./../db/users");

const getModelInfo = (model) => {
  let newModel = {};
  if (Object.keys(model).length > 0) {
    newModel = { ...model };
    delete newModel.password;
  }
  return newModel;
};

const getModelsInfo = (models) => {
  let newModels = [];
  if (models.length > 0) {
    for (const item of models) {
      const newItem = getModelInfo(item);
      newModels.push(newItem);
    }
  }
  return newModels;
};

module.exports.find = async (page, limit, keyword) => {
  try {
    const data = await dbUsers.slice((page - 1) * limit, page * limit);
    let newData = getModelsInfo(data);
    const payload = {
      data: newData,
      page,
      limit,
      totalPages: Math.ceil(dbUsers.length / limit),
      totalItems: dbUsers.length,
    };
    return payload;
  } catch (error) {
    return error;
  }
};

module.exports.findById = async (id) => {
  try {
    let payload = {};
    for (const item of dbUsers) {
      if (item._id === id) {
        payload = getModelInfo(item);
      }
    }
    return payload;
  } catch (error) {
    return error;
  }
};

module.exports.login = async (email, password) => {
  try {
    let payload = {};
    for (const item of dbUsers) {
      if (item.email === email && item.password === password) {
        payload = getModelInfo(item);
      }
    }
    return payload;
  } catch (error) {
    return error;
  }
};
