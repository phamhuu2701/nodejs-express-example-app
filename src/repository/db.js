const CitiesRepository = require("./city");
const UsersRepository = require("./user");
const PostsRepository = require("./post");
const ConversationsRepository = require("./conversation");
const MessagesRepository = require("./message");

const dbCities = require("./../db/cities");
const dbUsers = require("./../db/users");
const dbPosts = require("./../db/posts");
const dbComments = require("./../db/comments");
const dbMessages = require("./../db/messages");
const Images = require("./../db/static/images");
const Videos = require("./../db/static/videos");

module.exports.createCities = async () => {
  try {
    let payload = await CitiesRepository.find();

    if (payload.docs.length === 0) {
      for (const item of dbCities) {
        await CitiesRepository.create(item);
      }

      payload = await CitiesRepository.find();
      console.log("Create Cities collection successfully!");
    } else {
      console.log("Cities collection created");
    }

    return payload;
  } catch (error) {
    console.log("Create Cities collection failed: ", error);
    throw error;
  }
};

module.exports.createUsers = async () => {
  try {
    let payload = await UsersRepository.find(1, 10);

    if (payload.docs.length === 0) {
      const cities = await CitiesRepository.find("Hồ Chí Minh");

      for (const item of dbUsers) {
        let model = item;
        model.city = cities.docs[0];
        model.avatar = Images[Math.floor(Math.random() * Images.length)];
        await UsersRepository.create(model);
      }

      payload = await UsersRepository.find(1, 10);
      console.log("Create Users collection successfully!");
    } else {
      console.log("Users collection created");
    }

    return payload;
  } catch (error) {
    console.log("Create Users collection failed: ", error);
    throw error;
  }
};

module.exports.createPosts = async () => {
  try {
    let payload = await PostsRepository.find(1, 10);

    if (payload.docs.length === 0) {
      const user = await UsersRepository.findByEmail("odevine2n@google.com");

      for (const item of dbPosts) {
        let model = item;
        model.user = user;
        model.attachments = [];

        const flag = Math.random();
        if (flag > 0.66) {
          model.type = 0;
        } else if (flag < 0.33) {
          model.type = 1;
          model.attachments.push(
            Images[Math.floor(Math.random() * Images.length)]
          );
        } else {
          model.type = 2;
          model.attachments.push(
            Videos[Math.floor(Math.random() * Videos.length)]
          );
        }
        await PostsRepository.create(model);
      }

      payload = await PostsRepository.find(1, 10);
      console.log("Create Posts collection successfully!");
    } else {
      console.log("Posts collection created");
    }

    return payload;
  } catch (error) {
    console.log("Create Posts collection failed: ", error);
    throw error;
  }
};

module.exports.updatePosts = async () => {
  try {
    const usersPayload = await UsersRepository.find(1, dbUsers.length);
    let postsPayload = await PostsRepository.find(1, dbPosts.length);

    for (const item of postsPayload.docs) {
      let newItem = item;
      const likesCount = Math.floor(Math.random() * postsPayload.docs.length);
      if (newItem.likes.length === 0 && likesCount > 0) {
        for (let i = 0; i < likesCount; i++) {
          newItem.likes.push(usersPayload.docs[i]._id);
        }
      }

      const sharesCount = Math.floor(Math.random() * postsPayload.docs.length);
      if (newItem.shares.length === 0 && sharesCount > 0) {
        for (let i = 0; i < sharesCount; i++) {
          newItem.shares.push(usersPayload.docs[i]._id);
        }
      }

      const commentsCount = Math.floor(Math.random() * dbComments.length);
      if (newItem.comments.length === 0 && commentsCount > 0) {
        for (let i = 0; i < commentsCount; i++) {
          const comment = {
            content:
              dbComments[Math.floor(Math.random() * dbComments.length)].content,
            timestamps: new Date(),
            user:
              usersPayload.docs[
                Math.floor(Math.random() * usersPayload.docs.length)
              ]._id,
          };
          newItem.comments.push(comment);
        }
      }

      await PostsRepository.update(newItem._id, newItem);
    }
    console.log("Update Posts collection successfully!");

    postsPayload = await PostsRepository.find(1, 5);
    return postsPayload;
  } catch (error) {
    console.log("Update Posts collection failed: ", error);
    throw error;
  }
};

module.exports.createMessages = async () => {
  const usersPayload = await UsersRepository.find(1, dbUsers.length);

  try {
    let payload = await MessagesRepository.find(1, 10);

    if (payload.docs.length === 0) {
      for (const item of dbMessages) {
        const users = [
          usersPayload.docs[
            Math.floor(Math.random() * usersPayload.docs.length)
          ]._id,
          usersPayload.docs[
            Math.floor(Math.random() * usersPayload.docs.length)
          ]._id,
        ];

        const messagesCount = Math.floor(Math.random() * dbMessages.length);
        let messages = [];
        if (messagesCount >= 0) {
          for (let i = 0; i < messagesCount; i++) {
            const message = {
              user: users[Math.floor(Math.random() * users.length)],
              content:
                dbMessages[Math.floor(Math.random() * usersPayload.docs.length)]
                  .content,
              timestamps: new Date(),
            };
            messages.push(message);
          }
        }

        let newItem = {
          users,
          messages,
        };

        await MessagesRepository.create(newItem);
      }
      console.log("Create Messages collection successfully!");
    } else {
      console.log("Messages collection created");
    }

    payload = await MessagesRepository.find(1, 10);
    return payload;
  } catch (error) {
    console.log("Create Messages collection failed: ", error);
    throw error;
  }
};

module.exports.createConversations = async () => {
  try {
    let payload = await ConversationsRepository.find(1, 10);

    if (payload.docs.length === 0) {
      const usersPayload = await UsersRepository.find(1, dbUsers.length);

      for (let i = 0; i < 99; i++) {
        const model = {
          users: [
            usersPayload.docs[
              Math.floor(Math.random() * usersPayload.docs.length)
            ]._id,
            usersPayload.docs[
              Math.floor(Math.random() * usersPayload.docs.length)
            ]._id,
          ],
        };
        await ConversationsRepository.create(model);
      }

      payload = await ConversationsRepository.find(1, 10);
      console.log("Create Conversations collection successfully!");
    } else {
      console.log("Conversations collection created");
    }

    return payload;
  } catch (error) {
    console.log("Create Conversations collection failed: ", error);
    throw error;
  }
};

module.exports.createMessages = async () => {
  try {
    let conversationsPayload = await ConversationsRepository.find(1, 99);
    let payload = await MessagesRepository.find(1, 99);

    if (payload.docs.length === 0) {
      for (const item of conversationsPayload.docs) {
        const count = Math.floor((Math.random() * dbMessages.length) / 2);
        for (let i = 0; i < count; i++) {
          const model = {
            conversation: item._id,
            user: item.users[Math.floor(Math.random() * item.users.length)]._id,
            content:
              dbMessages[Math.floor(Math.random() * dbMessages.length)].content,
          };
          await MessagesRepository.create(model);
        }
      }

      payload = await MessagesRepository.find(1, 10);
      console.log("Create Messages collection successfully!");
    } else {
      console.log("Messages collection created");
    }

    return payload;
  } catch (error) {
    console.log("Create Messages collection failed: ", error);
    throw error;
  }
};
