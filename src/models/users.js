const mongoose = require('mongoose');
const connection = require('../config/connection');
const Schema = mongoose.Schema;

const schema = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailActive: { type: Boolean, default: false },
  phoneNumber: { type: String },
  phoneNumberActive: { type: Boolean, default: false },
  password: { type: String, required: true, minLength: 8 },
  gender: { type: Boolean, default: false },
  address: { type: String },
  birthday: { type: Date },
  avatar: { type: String, default: 'https://source.unsplash.com/random/400x400' },
  cover: { type: String, default: 'https://source.unsplash.com/random/1200x900' },
  role: { type: Number, enum: [0, 1, 2], default: 0 },
  loginCount: { type: Number, defaut: 0 },
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
