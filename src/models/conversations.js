"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connections = require("../config/mongodb");

const schema = {
  users: [{ type: Schema.ObjectId, ref: "Users" }],
};

const newSchema = new Schema(schema, {
  timestamps: true,
});

module.exports = connections.model("Conversations", newSchema);
