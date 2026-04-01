import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const tssContentSchema = new mongoose.Schema(
  {
    singleMetaTitle: {
      type: String,
      default: 'Single User TSS Renewal | Axatech',
    },
    singleMetaDescription: {
      type: String,
      default:
        'Renew your TSS and keep Tally up to date with GST, e-Invoice and compliance updates.',
    },
    singleLabel: {
      type: String,
      default: '2.1 Single User TSS Renewal',
    },
    singleTitle: {
      type: String,
      default: 'Keep Your Tally Always Up to Date',
    },
    singleSubtitle: {
      type: String,
      default:
        'Renew your Tally license software subscription and continue uninterrupted compliance and support.',
    },
    singleIntroText: {
      type: String,
      default:
        'Perfect for businesses that require uninterrupted compliance, trusted support, and consistent Tally performance.',
    },
    singleBenefitsTitle: {
      type: String,
      default: 'Benefits Included',
    },
    singleBenefits: {
      type: [String],
      default: [
        'Latest updates including GST, TDS and compliance changes',
        'Remote access features',
        'Priority support from Axatech',
        'Annual renewal at competitive pricing',
      ],
    },
    singleHighlights: {
      type: [highlightSchema],
      default: [
        {
          title: 'Always Compliance-Ready',
          description:
            'Stay aligned with the latest statutory requirements and regulatory updates without disruption.',
        },
        {
          title: 'Smooth Day-to-Day Operations',
          description:
            'Keep billing, accounting, and reporting workflows stable with timely subscription continuity.',
        },
        {
          title: 'Faster Support Response',
          description:
            'Get dependable priority assistance from the Axatech team whenever you need expert guidance.',
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model('TssContent', tssContentSchema);

