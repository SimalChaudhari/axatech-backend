import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true },
  keyFeatures: { type: [String], default: [] },
  category: { type: String, required: true },
  image: { type: String, required: true },
  webLink: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);

