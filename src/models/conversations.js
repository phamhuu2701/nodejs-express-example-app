"use strict";
const mongoose = require("mongoose");
const connection = require("../config/connection");
const Schema = mongoose.Schema;

const schema = {
  users: [{ type: Schema.ObjectId, ref: "Users" }],
};

const newSchema = new Schema(schema, {
  timestamps: true,
});

module.exports = connection.model("Conversations", newSchema);
