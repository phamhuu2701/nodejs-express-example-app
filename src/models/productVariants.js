const mongoose = require('mongoose');
const connection = require('../config/connection');
const Schema = mongoose.Schema;

const schema = {
  product: { type: Schema.ObjectId, required: true, ref: 'Products' },
  productColor: { type: Schema.ObjectId, ref: 'ProductColors' },
  productSize: { type: Schema.ObjectId, ref: 'ProductSizes' },
  productStyle: { type: Schema.ObjectId, ref: 'ProductStyles' },
  productMaterial: { type: Schema.ObjectId, ref: 'ProductMaterials' },
  amount: { type: Number, required: true, min: 0 },
  sold: { type: Number, required: true, min: 0, default: 0 },
  price: { type: Number, required: true, min: 0 },
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

module.exports = connection.model('ProductVariants', newSchema);
