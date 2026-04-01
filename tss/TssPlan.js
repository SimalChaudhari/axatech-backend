import mongoose from 'mongoose';

const tssPlanSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    // e.g. 'single', 'multi'
    type: { type: String, enum: ['single', 'multi'], required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    description: String,
    features: [String],
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('TssPlan', tssPlanSchema);

