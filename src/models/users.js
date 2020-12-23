const mongoose = require('mongoose');
const connection = require('../config/connection');
const Schema = mongoose.Schema;

const schema = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  password: { type: String, required: true, min: 8 },
  gender: { type: Boolean, default: false },
  role: { type: Number, default: 0 },
  address: { type: String },
  birthday: { type: Date },
  avatar: { type: String },
  cover: { type: String },
  emailActivated: { type: Boolean, default: false },
  phoneActivated: { type: Boolean, default: false },
  facebookLogin: {type: String},
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

newSchema.virtual('facebookAvatar').get(function () {
  return this.facebookLogin ? JSON.parse(this.facebookLogin).picture.data.url : null;
});

module.exports = connection.model('Users', newSchema);
