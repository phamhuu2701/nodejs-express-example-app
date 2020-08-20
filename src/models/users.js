"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connections = require("../config/mongodb");

const schema = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: { type: String },
  password: { type: String, required: true },
  gender: { type: Boolean, default: false },
  role: { type: String, default: "USER" },
  birthday: { type: Date },
  address: { type: String, default: "" },
  ip: { type: String },
  loginCount: { type: Number, default: 0 },
  lastLoginAt: { type: Date },
  active: { type: Boolean, default: false },
  city: { type: Schema.ObjectId, ref: "Cities" },
  avatar: { type: String },
};

const newSchema = new Schema(schema, {
  timestamps: true,
  toJSON: {
    transform: function (doc, res) {
      delete res.password;
      delete res.ip;
      delete res.id;
    },
    virtuals: true,
  },
  toObject: {
    transform: function (doc, res) {
      delete res.password;
      delete res.ip;
      delete res.id;
    },
    virtuals: true,
  },
});

newSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

module.exports = connections.model("Users", newSchema);
