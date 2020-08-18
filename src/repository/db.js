const CitiesModel = require("../models/cities");
const UsersModel = require("../models/users");
const PostsModel = require("../models/posts");

const dbCities = require("./../db/cities");
const dbUsers = require("./../db/users");
const dbPosts = require("./../db/posts");
const Images = require("./../db/static/images");
const Videos = require("./../db/static/videos");

module.exports.createCities = async () => {
  try {
    let payload = await CitiesModel.paginate();

    if (payload.docs.length === 0) {
      for (const item of dbCities) {
        const newModel = new CitiesModel(item);
        await newModel.save();
      }
    }

    payload = await CitiesModel.paginate();

    return payload;
  } catch (error) {
    throw error;
  }
};

module.exports.createUsers = async () => {
  try {
    let payload = await UsersModel.paginate();

    if (payload.docs.length === 0) {
      const city = await CitiesModel.findOne({ name: "Hồ Chí Minh" });

      for (const item of dbUsers) {
        const newModel = new UsersModel(item);
        newModel.city = city._id;
        await newModel.save();
      }
    }

    payload = await UsersModel.paginate();

    return payload;
  } catch (error) {
    throw error;
  }
};

module.exports.createPosts = async () => {
  try {
    let payload = await PostsModel.paginate();

    if (payload.docs.length === 0) {
      const user = await UsersModel.findOne({ email: "odevine2n@google.com" });

      for (const item of dbPosts) {
        const newModel = new PostsModel(item);
        newModel.user = user._id;
        if (Math.random() > 0.5) {
          newModel.type = 1;
          newModel.attachments.push(
            Images[Math.floor(Math.random() * Images.length)]
          );
        } else {
          newModel.type = 2;
          newModel.attachments.push(
            Videos[Math.floor(Math.random() * Videos.length)]
          );
        }
        await newModel.save();
      }
    }

    payload = await PostsModel.paginate();

    return payload;
  } catch (error) {
    throw error;
  }
};
