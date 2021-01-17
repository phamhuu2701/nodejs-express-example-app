const mongoose = require('mongoose');
const connection = require('../config/connection');
const Schema = mongoose.Schema;

const schema = {
  name: { type: String, required: true },
};

const newSchema = new Schema(schema, {
  timestamps: true,
  toJSON: {
    transform: function (doc, res) {
      delete res.id;
    },
    virtuals: true,
  },
  toObject: {
    transform: function (doc, res) {
      delete res.id;
    },
    virtuals: true,
  },
});

module.exports = connection.model('ProductMaterials', newSchema);
