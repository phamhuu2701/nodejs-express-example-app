const CitiesRepository = require("./city");
const UsersRepository = require("./user");
const PostsRepository = require("./post");

const dbCities = require("./../db/cities");
const dbUsers = require("./../db/users");
const dbPosts = require("./../db/posts");
const Images = require("./../db/static/images");
const Videos = require("./../db/static/videos");

module.exports.createCities = async () => {
  try {
    let payload = await CitiesRepository.find(1, 10);

    if (payload.docs.length === 0) {
      for (const item of dbCities) {
        await CitiesRepository.create(item);
      }

      payload = await CitiesRepository.find(1, 10);
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
      const cities = await CitiesRepository.find(1, 10, "Hồ Chí Minh");
      console.log("cities :>> ", cities);

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
