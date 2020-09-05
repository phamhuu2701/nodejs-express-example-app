"use strict";
const mongoose = require("mongoose");
const connection = require("../config/connection");
const Schema = mongoose.Schema;

const schema = {
  name: { type: String, required: true, index: true },
};

const newSchema = new Schema(schema);

module.exports = connection.model("Cities", newSchema);
