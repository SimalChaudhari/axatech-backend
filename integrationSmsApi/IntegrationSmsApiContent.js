import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const integrationSmsApiContentSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: 'SMS API Integration | Axatech' },
    metaDescription: {
      type: String,
      default: 'Automate customer notifications from Tally with SMS API integrations.',
    },
    metaKeywords: {
      type: String,
      default:
        'sms api integration, tally sms integration, automated sms alerts, payment reminder sms, axatech sms',
    },
    label: { type: String, default: '6.4 SMS API Integration' },
    title: { type: String, default: 'Automated SMS Notifications from Tally' },
    subtitle: {
      type: String,
      default: 'Keep customers informed with reliable SMS alerts and reminders.',
    },
    introText: {
      type: String,
      default:
        'Great for businesses that depend on timely billing, collections, and customer confirmation updates.',
    },
    highlights: {
      type: [highlightSchema],
      default: [
        {
          title: 'Instant Notification Delivery',
          description:
            'Trigger time-sensitive invoice and payment alerts with high message delivery reliability.',
        },
        {
          title: 'Template-Driven Messaging',
          description:
            'Use standardized, personalized SMS formats with dynamic values from Tally data.',
        },
        {
          title: 'Automated Reminder Flows',
          description:
            'Reduce manual follow-ups by scheduling reminder patterns that match your business cycle.',
        },
      ],
    },
    points: {
      type: [String],
      default: [
        'Invoice delivery and payment confirmation SMS',
        'Overdue payment reminders',
        'Custom SMS templates with dynamic Tally data',
        'Works with major Indian SMS gateways',
      ],
    },
    ctaText: { type: String, default: 'Setup SMS API Integration' },
    ctaPath: { type: String, default: '/contact' },
  },
  { timestamps: true }
);

export default mongoose.model('IntegrationSmsApiContent', integrationSmsApiContentSchema);

