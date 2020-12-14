const mongoose = require('mongoose');
const connection = require('../config/connection');
const Schema = mongoose.Schema;

const schema = {
  title: { type: String, required: true },
  public_id: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: '' },
  type: { type: Number, default: 0 }, // 0: text, 1: picture, 2: video
  attachments: [{ type: String }],
  hashtags: [{ type: String }],
  user: { type: Schema.ObjectId, ref: 'Users' },
  likes: [{ type: Schema.ObjectId, ref: 'Users' }],
  comments: [{ type: Schema.ObjectId, ref: 'Comments' }],
  views_count: { type: Number, default: 0 },
  likes_count: { type: Number, default: 0 },
  comments_count: { type: Number, default: 0 },
};

const newSchema = new Schema(schema, {
  timestamps: true,
});

module.exports = connection.model('Posts', newSchema);
