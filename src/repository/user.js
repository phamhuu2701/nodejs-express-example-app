const Model = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config');
const { ErrorMessage } = require('../variables/errorMessage');
const {
  validateEmail,
  validatePhoneNumber,
} = require('../validator/formValidate');

module.exports.find = async (page, limit, keyword) => {
  try {
    return await Model.paginate(
      keyword
        ? {
            $or: [
              { first_name: new RegExp(keyword.toLowerCase(), 'i') },
              { last_name: new RegExp(keyword.toLowerCase(), 'i') },
              { email: new RegExp(keyword.toLowerCase(), 'i') },
              { phone_number: new RegExp(keyword.toLowerCase(), 'i') },
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
    const res = await Model.findById(id);
    if (!res) {
      throw { message: ErrorMessage.NOT_FOUND };
    }
    return res;
  } catch (error) {
    throw error;
  }
};

module.exports.update = async (id, data) => {
  try {
    return await Model.findOneAndUpdate({ _id: id }, data, { new: true });
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

module.exports.findByEmail = async (email) => {
  try {
    return await Model.findOne({ email });
  } catch (error) {
    throw error;
  }
};

module.exports.findByPhoneNumber = async (phone_number) => {
  try {
    return await Model.findOne({ phone_number });
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
    throw error;
  }
};

module.exports.login = async (username, password) => {
  try {
    let user = null;

    // check username is email or phone number
    if (validateEmail(username)) {
      user = await Model.findOne({ email: username });
    } else if (validatePhoneNumber(username)) {
      user = await Model.findOne({ phone_number: username });
    } else {
      throw { message: ErrorMessage.USERNAME_OR_PASSWORD_INCORRECT };
    }

    if (!user) {
      throw { message: ErrorMessage.USERNAME_OR_PASSWORD_INCORRECT };
    }
    const passwordCompare = await bcrypt.compareSync(password, user.password);
    if (!passwordCompare) {
      throw { message: ErrorMessage.USERNAME_OR_PASSWORD_INCORRECT };
    }

    const token = await this.generateToken(user._id, user.email);
    return { user, token };
  } catch (error) {
    throw error;
  }
};

module.exports.decodeToken = async (token) => {
  try {
    token = token.replace('Bearer ', '');

    return await jwt.verify(token, CONFIG.JWT_SECRET);
  } catch (error) {
    throw { message: ErrorMessage.INVALID_TOKEN };
  }
};

module.exports.getUserByToken = async (token) => {
  try {
    const decoded = await this.decodeToken(token);
    if (decoded._id && decoded.email) {
      const user = await this.findById(decoded._id);
      if (user.email === decoded.email) {
        return user;
      }
    }
    throw { message: ErrorMessage.INVALID_TOKEN };
  } catch (error) {
    throw error;
  }
};

// module.exports.loginFacebook = async (data) => {
//   try {
//     let user = await this.findByEmail(data.email);
//     if (!user) {
//       const res = await this.create(data);
//       if (res) {
//         user = res;
//       }
//     }

//     const _data = {
//       loginCount: user.loginCount + 1,
//       lastLoginAt: new Date(),
//     };
//     await this.update(user._id, _data);

//     const token = await this.generateToken(user._id, user.email);
//     return { user, token };
//   } catch (error) {
//     throw error;
//   }
// };
