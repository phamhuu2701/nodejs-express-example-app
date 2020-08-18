const Repository = require("../repository/db");

module.exports.create = async (req) => {
  try {
    const citiesPayload = await Repository.createCities();
    const usersPayload = await Repository.createUsers();
    const postsPayload = await Repository.createPosts();

    return { citiesPayload, usersPayload, postsPayload };
  } catch (error) {
    throw error;
  }
};
