import mongoose from 'mongoose';

const bankingHighlightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const tdlBankingContentSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: 'Banking TDL | Axatech' },
    metaDescription: {
      type: String,
      default: 'Streamline bank workflows in Tally with custom banking TDL automation.',
    },
    metaKeywords: {
      type: String,
      default: 'banking tdl, bank reconciliation tally, cheque printing tally, neft rtgs export tally, axatech',
    },
    label: { type: String, default: '5.6 Banking TDL' },
    title: { type: String, default: 'Streamline Banking Workflows in Tally' },
    subtitle: { type: String, default: 'Automate key banking operations and reduce manual effort.' },
    introText: {
      type: String,
      default:
        'Ideal for organizations that need stronger banking control, cleaner payment execution, and less manual processing in Tally.',
    },
    bankingHighlights: {
      type: [bankingHighlightSchema],
      default: [
        {
          title: 'Reliable Financial Accuracy',
          description: 'Improve daily control over bank entries, reconciliation, and payment records across accounts.',
        },
        {
          title: 'Process Automation at Scale',
          description:
            'Automate repeatable banking operations to reduce manual touchpoints and operational delays.',
        },
        {
          title: 'Faster Treasury Execution',
          description:
            'Support smoother payment cycles with structured output formats aligned to banking workflows.',
        },
      ],
    },
    points: {
      type: [String],
      default: [
        'Bank reconciliation automation',
        'Cheque printing in bank-specific formats',
        'Payment advice generation',
        'NEFT/RTGS file export for multiple banks',
      ],
    },
    ctaText: { type: String, default: 'Request Banking TDL' },
    ctaPath: { type: String, default: '/contact' },
  },
  { timestamps: true }
);

export default mongoose.model('TdlBankingContent', tdlBankingContentSchema);

