"use strict";
const mongoose = require("mongoose");
const connection = require("../config/connection");
const Schema = mongoose.Schema;

const schema = {
  content: { type: String, required: true },
  type: { type: Number, default: 0 }, // [0: text, 1: images, 2: videos]
  attachments: { type: Array, default: [] },
  likes: [{ type: Schema.ObjectId, ref: "Users" }],
  comments: [],
  shares: [{ type: Schema.ObjectId, ref: "Users" }],
  user: { type: Schema.ObjectId, ref: "Users" },
};

const newSchema = new Schema(schema, {
  timestamps: true,
});

module.exports = connection.model("Posts", newSchema);
