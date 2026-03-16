import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  excerpt: String,
  content: { type: String, required: true },
  image: String,
  author: String,
  published: { type: Boolean, default: false },
  publishedAt: Date,
  metaTitle: String,
  metaDescription: String,
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
