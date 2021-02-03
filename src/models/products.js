const mongoose = require('mongoose');
const connection = require('../connector/mongo/connection');
const Schema = mongoose.Schema;

const schema = {
  title: { type: String, required: true, trim: true, maxlength: 250 },
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
  vendor: { type: Schema.ObjectId, ref: 'Vendors' },
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

newSchema.path('images').validate(function (items) {
  if (items.length === 0) {
    throw new Error('Images can not be blank');
  }
  if (items.length > 5) {
    throw new Error('Images length can not be greater than 5');
  }
});

newSchema.path('videos').validate(function (items) {
  if (items.length > 2) {
    throw new Error('Videos length can not be greater than 2');
  }
});

newSchema.path('tags').validate(function (items) {
  if (items.length > 5) {
    throw new Error('Tags length can not be greater than 5');
  }
});

module.exports = connection.model('Products', newSchema);
