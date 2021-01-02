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
  address: { type: String },
  birthday: { type: Date },
  avatar: { type: String, default: 'https://source.unsplash.com/random/300x300' },
  cover: { type: String, default: 'https://source.unsplash.com/random/1600x400' },
};

const newSchema = new Schema(schema, {
  timestamps: true,
  toJSON: {
    transform: function (doc, res) {
      delete res.password;
      delete res.id;
    },
    virtuals: true,
  },
  toObject: {
    transform: function (doc, res) {
      delete res.password;
      delete res.id;
    },
    virtuals: true,
  },
});

newSchema.virtual('fullName').get(function () {
  return this.firstName.trim() + ' ' + this.lastName.trim();
});

module.exports = connection.model('Users', newSchema);
