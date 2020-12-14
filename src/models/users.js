const mongoose = require('mongoose');
const connection = require('../config/connection');
const Schema = mongoose.Schema;

const schema = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, default: '' },
  password: { type: String, required: true, min: 8 },
  gender: { type: Boolean, default: false },
  role: { type: Number, default: 0 },
  address: { type: String, default: '' },
  birthday: { type: Date, default: Date.now },
  avatar: { type: String, default: '' },
  cover: { type: String, default: '' },
  emailActivated: { type: Boolean, default: false },
  phoneActivated: { type: Boolean, default: false },
  loginCount: { type: Number, default: 0},
  facebookLogin: {type: String, default: ''},
  facebookAvatar: {type: String, default: ''},
};

const newSchema = new Schema(schema, {
  timestamps: true,
  toJSON: {
    transform: function (doc, res) {
      delete res.password;
      delete res.id;
      delete res.facebookLogin;
    },
    virtuals: true,
  },
  toObject: {
    transform: function (doc, res) {
      delete res.password;
      delete res.id;
      delete res.facebookLogin;
    },
    virtuals: true,
  },
});

newSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

module.exports = connection.model('Users', newSchema);
