const mongoose = require('mongoose');
const connection = require('../config/connection');
const Schema = mongoose.Schema;

const schema = {
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String },
  password: { type: String, required: true, min: 8 },
  gender: { type: Boolean, default: false },
  role: { type: Number, default: 0 },
  address: { type: String },
  birthday: { type: Date },
  avatar: { type: String },
  cover: { type: String },
  email_activated: { type: Boolean, default: false },
  phone_activate: { type: Boolean, default: false },
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

newSchema.virtual('full_name').get(function () {
  return this.first_name + ' ' + this.last_name;
});

module.exports = connection.model('Users', newSchema);
