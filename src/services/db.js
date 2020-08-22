const Repository = require("../repository/db");

module.exports.create = async (req) => {
  try {
    const citiesPayload = await Repository.createCities();
    const usersPayload = await Repository.createUsers();
    const postsPayload = await Repository.createPosts();
    const postsPayloadUpdated = await Repository.updatePosts();

    return {
      // citiesPayload,
      // usersPayload,
      // postsPayload,
      postsPayloadUpdated,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
