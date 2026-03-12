import mongoose from 'mongoose';

const cloudPlanSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  type: { type: String, enum: ['shared', 'vps'], required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  period: { type: String, default: 'month' },
  description: String,
  features: [String],
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('CloudPlan', cloudPlanSchema);
