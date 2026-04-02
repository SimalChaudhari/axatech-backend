import mongoose from 'mongoose';

const productivityPillarSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const tdlProductivityContentSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: 'Productivity TDL | Axatech' },
    metaDescription: {
      type: String,
      default: 'Speed up daily Tally operations with productivity-focused TDL customizations.',
    },
    metaKeywords: {
      type: String,
      default:
        'productivity tdl, tdl productivity, tally productivity, smart defaults tally, workflow automation tally, axatech',
    },
    label: { type: String, default: '5.2 Productivity TDL' },
    title: { type: String, default: 'Speed Up Your Daily Tally Operations' },
    subtitle: {
      type: String,
      default: 'Automation and process acceleration to help your team complete more work in less time.',
    },
    introText: {
      type: String,
      default:
        'Ideal for businesses handling high daily voucher volumes and teams that need speed without sacrificing control.',
    },
    productivityPillars: {
      type: [productivityPillarSchema],
      default: [
        {
          title: 'Faster Data Entry',
          description: 'Smart defaults and assisted workflows reduce repetitive effort for day-to-day accounting.',
        },
        {
          title: 'Workflow Automation',
          description: 'Automated steps and custom shortcuts ensure teams complete tasks consistently and quickly.',
        },
        {
          title: 'Operational Accuracy',
          description: 'Standardized processes lower manual mistakes and improve reliability of business records.',
        },
      ],
    },
    points: {
      type: [String],
      default: [
        'Auto-fill and smart defaults for faster entry',
        'Batch voucher processing',
        'Custom shortcuts and workflow automation',
        'Reduce data entry time by up to 60%',
      ],
    },
    ctaText: { type: String, default: 'Request Productivity TDL' },
    ctaPath: { type: String, default: '/contact' },
  },
  { timestamps: true }
);

export default mongoose.model('TdlProductivityContent', tdlProductivityContentSchema);

