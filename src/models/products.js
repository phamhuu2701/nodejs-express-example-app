const mongoose = require('mongoose');
const connection = require('../config/connection');
const Schema = mongoose.Schema;

const schema = {
  title: { type: String, required: true, maxLength: 200 },
  description: { type: String, required: true },
  publishId: { type: String, required: true },
  images: [{ type: String }],
  videos: [{ type: String }],
  pricing: { type: Number, required: true },
  quantity: { type: Number, required: true },
  weight: { type: Number },
  size: [{ type: String }],
  color: [{ type: String }],
  material: [{ type: String }],
  style: [{ type: String }],
  metaTitle: [{ type: String }],
  metaDescription: [{ type: String }],
  metaUrl: [{ type: String }],
  active: { type: Boolean, default: false },
  type: { type: String },
  vendor: { type: String },
  tags: [{ type: String }],
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

module.exports = connection.model('Products', newSchema);
