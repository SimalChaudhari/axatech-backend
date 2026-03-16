import mongoose from 'mongoose';

const licensePlanSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  type: { type: String, enum: ['single', 'multi'], required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  description: String,
  features: [String],
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('LicensePlan', licensePlanSchema);
