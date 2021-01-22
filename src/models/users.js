const mongoose = require('mongoose');
const connection = require('../connector/mongo/connection');
const Schema = mongoose.Schema;

const schema = {
  firstName: { type: String, required: true, trim: true, maxlength: 30 },
  lastName: { type: String, required: true, trim: true, maxlength: 30 },
  email: { type: String, required: true, unique: true, trim: true, maxlength: 50 },
  emailActive: { type: Boolean, default: false },
  phoneNumber: { type: String, trim: true, maxlength: 20 },
  phoneNumberActive: { type: Boolean, default: false },
  password: { type: String, required: true, trim: true, minlength: 8, maxlength: 100 },
  gender: { type: Boolean, default: false },
  address: { type: String, trim: true, maxlength: 250 },
  birthday: { type: Date },
  avatar: {
    type: String,
    trim: true,
    default: 'https://source.unsplash.com/random/400x400',
    maxlength: 300,
  },
  cover: {
    type: String,
    trim: true,
    default: 'https://source.unsplash.com/random/1200x900',
    maxlength: 300,
  },
  role: { type: Number, required: true, enum: [0, 1, 2], default: 0 },
  loginCount: { type: Number, required: true, min: 0, default: 0 },
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
