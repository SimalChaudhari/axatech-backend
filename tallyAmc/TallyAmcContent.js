import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const tallyAmcContentSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: 'Tally AMC | Axatech' },
    metaDescription: {
      type: String,
      default:
        'Annual Maintenance Contract for Tally with priority support, upgrades, and issue resolution.',
    },
    metaKeywords: {
      type: String,
      default:
        'tally amc, tally annual maintenance, tally support contract, tally upgrades support, axatech tally support',
    },
    label: { type: String, default: '7. Tally AMC' },
    title: { type: String, default: 'Annual Maintenance - So You Never Face Downtime' },
    subtitle: {
      type: String,
      default:
        'Year-round Tally support for businesses that rely on Tally daily and cannot afford disruptions.',
    },
    introText: {
      type: String,
      default:
        'Designed for businesses that need stable Tally performance, quick troubleshooting, and predictable annual support.',
    },
    highlights: {
      type: [highlightSchema],
      default: [
        {
          title: 'Continuous Operational Support',
          description:
            'Get dependable expert assistance to keep daily accounting operations uninterrupted.',
        },
        {
          title: 'Preventive Maintenance Approach',
          description:
            'Reduce downtime risk through proactive updates, issue checks, and platform housekeeping.',
        },
        {
          title: 'Faster Resolution Turnaround',
          description:
            'Resolve critical Tally issues quickly with prioritized support workflows and escalation.',
        },
      ],
    },
    benefitsTitle: { type: String, default: 'Benefits Included' },
    benefits: {
      type: [String],
      default: [
        'Unlimited remote support sessions',
        'Data recovery and corruption fixes',
        'Version upgrades and patch installations',
        'Year-end closing and audit support',
        'Priority response within 4 business hours',
      ],
    },
    ctaText: { type: String, default: 'Request Tally AMC' },
    ctaPath: { type: String, default: '/contact' },
  },
  { timestamps: true }
);

export default mongoose.model('TallyAmcContent', tallyAmcContentSchema);

