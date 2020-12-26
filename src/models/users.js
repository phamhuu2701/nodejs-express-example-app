const mongoose = require('mongoose');
const connection = require('../config/connection');
const Schema = mongoose.Schema;

const schema = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailActivated: { type: Boolean, default: false },
  phoneNumber: { type: String },
  phoneActivated: { type: Boolean, default: false },
  password: { type: String, required: true, min: 8 },
  gender: { type: Boolean, default: false },
  role: { type: Number, default: 0 },
  address: { type: String },
  birthday: { type: Date },
  avatar: { type: String, default: 'https://res.cloudinary.com/dxgbnd5t6/image/upload/v1608977200/haloha/assets/images/avatar_default_l4qllr.png' },
  cover: { type: String, default: 'https://res.cloudinary.com/dxgbnd5t6/image/upload/v1608977201/haloha/assets/images/cover_default_yyilmd.jpg' },
  facebookLogin: {type: String},
  googleLogin: {type: String},
};

const newSchema = new Schema(schema, {
  timestamps: true,
  toJSON: {
    transform: function (doc, res) {
      delete res.password;
      delete res.id;
      delete res.facebookLogin;
      delete res.googleLogin;
    },
    virtuals: true,
  },
  toObject: {
    transform: function (doc, res) {
      delete res.password;
      delete res.id;
      delete res.facebookLogin;
      delete res.googleLogin;
    },
    virtuals: true,
  },
});

newSchema.virtual('fullName').get(function () {
  return this.firstName.trim() + ' ' + this.lastName.trim();
});

module.exports = connection.model('Users', newSchema);
