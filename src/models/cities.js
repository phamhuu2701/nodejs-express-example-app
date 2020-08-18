"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connections = require("../config/mongodb");

const schema = {
  name: { type: String, required: true, index: true },
};

const newSchema = new Schema(schema);

module.exports = connections.model("Cities", newSchema);
