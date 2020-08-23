const Repository = require("../repository/db");

module.exports.create = async (req) => {
  try {
    const citiesPayload = await Repository.createCities();
    const usersPayload = await Repository.createUsers();
    const postsPayload = await Repository.createPosts();
    const postsPayloadUpdated = await Repository.updatePosts();
    const conversationsPayload = await Repository.createConversations();
    let messagesPayload = {};
    if (Object.keys(conversationsPayload).length > 0) {
      messagesPayload = await Repository.createMessages();
    }

    return {
      // citiesPayload,
      // usersPayload,
      // postsPayload,
      // postsPayloadUpdated,
      conversationsPayload,
      messagesPayload,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
