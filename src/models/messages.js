"use strict";
const mongoose = require("mongoose");
const connection = require("../config/connection");
const Schema = mongoose.Schema;

const schema = {
  conversation: { type: Schema.ObjectId, ref: "Conversations" },
  user: { type: Schema.ObjectId, ref: "Users" },
  content: { type: String, required: true },
};

const newSchema = new Schema(schema, {
  timestamps: true,
});

module.exports = connection.model("Messages", newSchema);
