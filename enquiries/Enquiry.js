import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  type: { type: String, enum: ['contact', 'product', 'service', 'license', 'cloud'], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  message: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  licensePlan: { type: mongoose.Schema.Types.ObjectId, ref: 'LicensePlan' },
  cloudPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'CloudPlan' },
  status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' },
  adminNotes: String,
}, { timestamps: true });

export default mongoose.model('Enquiry', enquirySchema);
