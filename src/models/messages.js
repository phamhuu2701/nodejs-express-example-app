"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connections = require("../config/mongodb");

const schema = {
  conversation: { type: Schema.ObjectId, ref: "Conversations" },
  user: { type: Schema.ObjectId, ref: "Users" },
  content: { type: String, required: true },
};

const newSchema = new Schema(schema, {
  timestamps: true,
});

module.exports = connections.model("Messages", newSchema);
