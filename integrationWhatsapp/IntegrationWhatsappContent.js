import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const integrationWhatsappContentSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: 'Tally to WhatsApp Integration | Axatech' },
    metaDescription: {
      type: String,
      default: 'Send invoices and payment reminders from Tally directly to WhatsApp.',
    },
    metaKeywords: {
      type: String,
      default:
        'tally whatsapp integration, whatsapp business api, invoice on whatsapp, payment reminders whatsapp, axatech',
    },
    label: { type: String, default: '6.3 Tally to WhatsApp' },
    title: { type: String, default: 'Send Tally Documents via WhatsApp' },
    subtitle: {
      type: String,
      default:
        'Automate customer communication directly from Tally using WhatsApp workflows.',
    },
    introText: {
      type: String,
      default:
        'Perfect for businesses that need quicker collections, timely customer updates, and less communication overhead.',
    },
    highlights: {
      type: [highlightSchema],
      default: [
        {
          title: 'Faster Customer Reach',
          description:
            'Deliver invoices and reminders on WhatsApp instantly from your accounting workflows.',
        },
        {
          title: 'Reliable Communication',
          description:
            'Send consistent, template-based messages to reduce misses and improve follow-up quality.',
        },
        {
          title: 'Automation-First Process',
          description:
            'Eliminate manual sharing steps with rule-driven message triggers from Tally events.',
        },
      ],
    },
    points: {
      type: [String],
      default: [
        'Auto-send invoices to customers on voucher save',
        'Outstanding payment reminders with one click',
        'Supports WhatsApp Business API',
        'No manual copy-paste, straight from Tally',
      ],
    },
    ctaText: { type: String, default: 'Setup WhatsApp Integration' },
    ctaPath: { type: String, default: '/contact' },
  },
  { timestamps: true }
);

export default mongoose.model(
  'IntegrationWhatsappContent',
  integrationWhatsappContentSchema
);

