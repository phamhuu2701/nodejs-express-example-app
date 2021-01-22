const mongoose = require('mongoose');
const connection = require('../connector/mongo/connection');
const Schema = mongoose.Schema;

const schema = {
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, required: true, trim: true, maxlength: 2500 },
  publishId: { type: String, required: true, trim: true, maxlength: 100 },
  images: [{ type: String }],
  videos: [{ type: String }],
  amount: { type: Number, required: true, min: 0 },
  sold: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  metaTitle: { type: String, required: true, trim: true, maxlength: 200 },
  metaDescription: { type: String, required: true, trim: true, maxlength: 300 },
  metaUrl: { type: String, required: true, trim: true, maxlength: 200 },
  status: { type: String, required: true, enum: ['Draft', 'Published'], default: 'Draft' },
  vendor: { type: String, trim: true, maxlength: 100 },
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

newSchema.path('images').validate(function (value) {
  if (value.length === 0) {
    throw new Error('Images can not be blank');
  }
  if (value.length > 5) {
    throw new Error('Images size can not be greater than 5');
  }
});

newSchema.path('videos').validate(function (value) {
  if (value.length > 2) {
    throw new Error('Videos size can not be greater than 2');
  }
});

newSchema.path('tags').validate(function (value) {
  if (value.length > 5) {
    throw new Error('Tags size can not be greater than 5');
  }
});

module.exports = connection.model('Products', newSchema);
