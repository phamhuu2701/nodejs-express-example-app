const Model = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateEmail, validatePhoneNumber } = require('../utils/formValidate');
const CONFIG = require('../config');
const ErrorCode = require('../utils/errorCode');

const create = async (model) => {
  try {
    const { email, phoneNumber } = model;

    if (email) {
      const user = await Model.findOne({ email });
      if (user) {
        throw {
          message: ErrorCode.EMAIL_ALREADY_EXISTS,
          code: ErrorCode.EMAIL_ALREADY_EXISTS,
        };
      }
    }
    if (phoneNumber) {
      const user = await Model.findOne({ phoneNumber });
      if (user) {
        throw {
          message: ErrorCode.PHONE_NUMBER_ALREADY_EXISTS,
          code: ErrorCode.PHONE_NUMBER_ALREADY_EXISTS,
        };
      }
    }

    if (model.password) {
      const salt = bcrypt.genSaltSync(10);
      const passwordEncode = bcrypt.hashSync(model.password, salt);
      model.password = passwordEncode;
    }

    const newModel = new Model(model);
    return await newModel.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const find = async ({ page, limit, keyword }) => {
  try {
    return await Model.paginate(
      keyword
        ? {
            $or: [
              { firstName: new RegExp(keyword.toLowerCase(), 'i') },
              { lastName: new RegExp(keyword.toLowerCase(), 'i') },
              { email: new RegExp(keyword.toLowerCase(), 'i') },
              { phoneNumber: new RegExp(keyword.toLowerCase(), 'i') },
            ],
          }
        : {},
      {
        page,
        limit,
        sort: { createdAt: -1 },
      },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findById = async (_id) => {
  try {
    const res = await Model.findById(_id);
    if (res) {
      return res;
    } else {
      throw { message: ErrorCode.NOT_FOUND, code: ErrorCode.NOT_FOUND };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findByEmail = async (email) => {
  try {
    const res = await Model.findOne({ email });
    if (res) {
      return res;
    } else {
      throw { message: ErrorCode.NOT_FOUND, code: ErrorCode.NOT_FOUND };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findByPhoneNumber = async (phoneNumber) => {
  try {
    const res = await Model.findOne({ phoneNumber });
    if (res) {
      return res;
    } else {
      throw { message: ErrorCode.NOT_FOUND, code: ErrorCode.NOT_FOUND };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const update = async ({ _id, data }) => {
  try {
    return await Model.findOneAndUpdate({ _id }, data, { new: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const _delete = async (_id) => {
  try {
    return await Model.findOneAndDelete({ _id });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const generateToken = async ({ _id, email }) => {
  try {
    return await jwt.sign({ _id, email }, CONFIG.JWT_SECRET, { expiresIn: CONFIG.JWT_EXPIRATION });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const decodeToken = async (token) => {
  try {
    const _token = token.replace('Bearer ', '');

    return await jwt.verify(_token, CONFIG.JWT_SECRET);
  } catch (error) {
    console.log(error);
    throw { message: ErrorCode.INVALID_TOKEN, code: ErrorCode.INVALID_TOKEN };
  }
};

const login = async ({ username, password }) => {
  try {
    let user = null;

    // detect username is email or phoneNumber
    if (validateEmail(username).success) {
      user = await Model.findOne({ email: username });
    } else if (validatePhoneNumber(username).success) {
      user = await Model.findOne({ phoneNumber: username });
    } else {
      throw {
        message: ErrorCode.USERNAME_OR_PASSWORD_INCORRECT,
        code: ErrorCode.USERNAME_OR_PASSWORD_INCORRECT,
      };
    }

    if (!user) {
      throw {
        message: ErrorCode.USERNAME_OR_PASSWORD_INCORRECT,
        code: ErrorCode.USERNAME_OR_PASSWORD_INCORRECT,
      };
    } else {
      const passwordCompare = await bcrypt.compareSync(password, user.password);
      if (!passwordCompare) {
        throw {
          message: ErrorCode.USERNAME_OR_PASSWORD_INCORRECT,
          code: ErrorCode.USERNAME_OR_PASSWORD_INCORRECT,
        };
      } else {
        const token = await generateToken({ _id: user._id, email: user.email });
        return { user, token };
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserByToken = async (token) => {
  try {
    const decoded = await decodeToken(token);
    if (decoded._id && decoded.email) {
      const user = await findById(decoded._id);
      if (user.email === decoded.email) {
        return user;
      }
    }

    throw { message: ErrorCode.INVALID_TOKEN, code: ErrorCode.INVALID_TOKEN };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginFacebook = async (data) => {
  try {
    const { email, name, picture } = data;

    let user = await Model.findOne({ email });
    if (!user) {

      // register user
      let item = {
        firstName: name.slice(0, name.indexOf(' ')).trim(),
        lastName: name.slice(name.indexOf(' '), name.length).trim(),
        email,
        password: Math.random().toString(36).substring(5) + Math.random().toString(36).substring(5),
        avatar: picture.data.url,
      };
      user = await create(item);
    } else {

      // update user
      if (JSON.stringify(data) !== JSON.stringify(user.facebookLogin)) {
        let _data = {
          firstName: name.slice(0, name.indexOf(' ')).trim(),
          lastName: name.slice(name.indexOf(' '), name.length).trim(),
          password:
            Math.random().toString(36).substring(5) + Math.random().toString(36).substring(5),
          avatar: picture.data.url,
        };
        user = await update({ _id: user._id, data: _data });
      }
    }

    const token = await generateToken({ _id: user._id, email: user.email });
    return { user, token };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginGoogle = async (data) => {
  try {
    const { profileObj } = data;
    const { email, givenName, familyName, imageUrl } = profileObj;

    let user = await Model.findOne({ email });
    if (!user) {

      // register user
      let item = {
        firstName: givenName,
        lastName: familyName,
        email,
        password: Math.random().toString(36).substring(5) + Math.random().toString(36).substring(5),
        avatar: imageUrl,
      };
      user = await create(item);
    } else {

      // update user
      if (JSON.stringify(data) !== JSON.stringify(user.googleLogin)) {
        let _data = {
          firstName: givenName,
          lastName: familyName,
          password:
            Math.random().toString(36).substring(5) + Math.random().toString(36).substring(5),
          avatar: imageUrl,
        };
        user = await update({ _id: user._id, data: _data });
      }
    }

    const token = await generateToken({ _id: user._id, email: user.email });
    return { user, token };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  find,
  findById,
  findByEmail,
  findByPhoneNumber,
  update,
  delete: _delete,
  generateToken,
  decodeToken,
  login,
  getUserByToken,
  loginFacebook,
  loginGoogle,
};
