import mongoose from 'mongoose';

const categoryEnum = [
  'Frontend Technologies',
  'Backend Technologies',
  'Database Technologies',
];

const technologySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: categoryEnum,
    },
    image: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Technology', technologySchema);
