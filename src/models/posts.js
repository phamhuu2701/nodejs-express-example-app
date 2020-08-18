"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connections = require("../config/mongodb");

const schema = {
  content: { type: String, required: true },
  type: { type: Number, default: 0 }, // [0: text, 1: images, 2: videos]
  attachments: { type: Array, default: [] },
  likes: { type: Array, default: [] },
  comment: { type: Array, default: [] },
  shares: { type: Array, default: [] },
  user: { type: Schema.ObjectId, ref: "Users" },
};

const newSchema = new Schema(schema, {
  timestamps: true,
});

module.exports = connections.model("Posts", newSchema);
