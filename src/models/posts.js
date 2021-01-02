const mongoose = require('mongoose');
const connection = require('../config/connection');
const Schema = mongoose.Schema;

const TYPES = ['post', 'picture', 'video']

const schema = {
  title: { type: String, required: true },
  publicId: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, default: TYPES[0] },
  category: { type: String, default: '' },
  attachments: [{ type: String }],
  hashtags: [{ type: String }],
  user: { type: Schema.ObjectId, ref: 'Users' },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
};

const newSchema = new Schema(schema, {
  timestamps: true,
});

module.exports = connection.model('Posts', newSchema);
