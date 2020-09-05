const Model = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CONFIG = require("../config");
const { ErrorCode } = require("../utils/variables");
const { ErrorHandler } = require("../utils/errorHandler");

module.exports.find = async (page, limit, keyword) => {
  try {
    return await Model.paginate(
      keyword
        ? {
            $or: [
              { firstName: new RegExp(keyword.toLowerCase(), "i") },
              { lastName: new RegExp(keyword.toLowerCase(), "i") },
              { email: new RegExp(keyword.toLowerCase(), "i") },
              { phoneNumber: new RegExp(keyword.toLowerCase(), "i") },
            ],
          }
        : {},
      {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: "city",
      }
    );
  } catch (error) {
    throw error;
  }
};

module.exports.create = async (model) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const passwordEncode = bcrypt.hashSync(model.password, salt);

    model.password = passwordEncode;

    const newModel = new Model(model);
    return await newModel.save();
  } catch (error) {
    throw error;
  }
};

module.exports.findById = async (id) => {
  try {
    return await Model.findById(id).populate("city");
  } catch (error) {
    throw error;
  }
};

module.exports.update = async (id, data) => {
  try {
    return await Model.findByIdAndUpdate(id, data).populate("city");
  } catch (error) {
    throw error;
  }
};

module.exports.delete = async (id) => {
  try {
    return await Model.findByIdAnddelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports.findByEmail = async (email) => {
  try {
    return await Model.findOne({ email }).populate("city");
  } catch (error) {
    throw error;
  }
};

module.exports.generateToken = async (_id, email) => {
  try {
    return await jwt.sign({ _id, email }, CONFIG.JWT_SECRET, {
      expiresIn: CONFIG.JWT_EXPIRATION,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.login = async (email, password) => {
  try {
    const user = await this.findByEmail(email);
    if (!user) {
      return Promise.reject(
        ErrorHandler.create(ErrorCode.EMAIL_OR_PASSWORD_INCORRECT)
      );
    }
    const passwordCorrect = await bcrypt.compareSync(password, user.password);
    if (!passwordCorrect) {
      return Promise.reject(
        ErrorHandler.create(ErrorCode.EMAIL_OR_PASSWORD_INCORRECT)
      );
    }

    user.set("loginCount", user.loginCount + 1);
    user.set("lastLoginAt", new Date());

    const data = { loginCount: user.loginCount + 1, lastLoginAt: new Date() };
    await this.update(user._id, data);

    const token = await this.generateToken(user._id, user.email);
    return { user, token };
  } catch (error) {
    throw error;
  }
};

module.exports.decodeToken = async (token) => {
  try {
    return await jwt.verify(token, CONFIG.JWT_SECRET);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getUserByToken = async (token) => {
  try {
    const res = await this.decodeToken(token);
    if (res && res.email) {
      const user = this.findByEmail(res.email);
      if (user) {
        return user;
      } else {
        return Promise.reject(ErrorHandler.create(ErrorCode.INVALID_TOKEN));
      }
    } else {
      return Promise.reject(ErrorHandler.create(ErrorCode.INVALID_TOKEN));
    }
  } catch (error) {
    throw error;
  }
};
