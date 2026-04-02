import mongoose from 'mongoose';

const industryHighlightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const tdlBusinessSpecificContentSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: 'Business-Specific TDL | Axatech' },
    metaDescription: {
      type: String,
      default: 'Industry-specific TDL solutions built for your unique business workflow in Tally.',
    },
    metaKeywords: {
      type: String,
      default:
        'business specific tdl, industry specific tdl, custom tdl tally, workflow tdl customization, axatech',
    },
    label: { type: String, default: '5.5 Business-Specific TDL' },
    title: { type: String, default: 'Customizations for Your Industry' },
    subtitle: {
      type: String,
      default: 'Purpose-built TDL enhancements designed around industry workflows.',
    },
    introText: {
      type: String,
      default:
        'Tailored for businesses that need domain-focused customization, stronger process discipline, and better reporting reliability.',
    },
    industryHighlights: {
      type: [industryHighlightSchema],
      default: [
        {
          title: 'Industry-Aligned Workflows',
          description: 'Create process-specific logic that aligns Tally with how your business actually operates.',
        },
        {
          title: 'Practical Operational Control',
          description: 'Capture the right data, enforce the right checks, and improve daily execution quality.',
        },
        {
          title: 'Scalable Custom Foundation',
          description:
            'Start with your current needs and extend smoothly as your teams, branches, and operations grow.',
        },
      ],
    },
    points: {
      type: [String],
      default: [
        'Manufacturing: BOM, job work, production tracking',
        'Real estate: project-wise accounting, installment tracking',
        'Retail: POS integration, loyalty points, barcode',
        'Education, healthcare, hospitality and more',
      ],
    },
    ctaText: { type: String, default: 'Request Business-Specific TDL' },
    ctaPath: { type: String, default: '/contact' },
  },
  { timestamps: true }
);

export default mongoose.model('TdlBusinessSpecificContent', tdlBusinessSpecificContentSchema);

