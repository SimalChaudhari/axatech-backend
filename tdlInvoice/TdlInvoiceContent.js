import mongoose from 'mongoose';

const invoiceHighlightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const tdlInvoiceContentSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: 'Invoice TDL | Axatech' },
    metaDescription: {
      type: String,
      default: 'Build branded, professional invoice formats in Tally with custom invoice TDL.',
    },
    metaKeywords: {
      type: String,
      default:
        'invoice tdl, custom invoice tally, branded invoice tally, invoice format tally, axatech',
    },
    label: { type: String, default: '5.4 Invoice TDL' },
    title: { type: String, default: 'Professional Invoices, Your Brand Identity' },
    subtitle: {
      type: String,
      default: 'Create industry-ready invoice formats that match your business standards.',
    },
    introText: {
      type: String,
      default:
        'Built for businesses that need accurate, compliant, and professionally branded invoices directly from Tally.',
    },
    invoiceHighlights: {
      type: [invoiceHighlightSchema],
      default: [
        {
          title: 'Brand-Perfect Output',
          description: 'Design invoice templates that reflect your identity with clean branding, terms, and formatting.',
        },
        {
          title: 'Business-Specific Formats',
          description: 'Build layouts suited for your workflow across product lines, billing models, and industries.',
        },
        {
          title: 'Faster Billing Operations',
          description: 'Reduce manual effort with smart data placement and reliable print/export-ready invoice templates.',
        },
      ],
    },
    points: {
      type: [String],
      default: [
        'Custom invoice formats with logo, terms and branding',
        'Multi-format support (A4, A5, thermal/POS)',
        'Auto-fill bank details, QR codes, and digital signatures',
        'Industry-specific formats (retail, pharma, manufacturing)',
      ],
    },
    ctaText: { type: String, default: 'Request Invoice TDL' },
    ctaPath: { type: String, default: '/contact' },
  },
  { timestamps: true }
);

export default mongoose.model('TdlInvoiceContent', tdlInvoiceContentSchema);

