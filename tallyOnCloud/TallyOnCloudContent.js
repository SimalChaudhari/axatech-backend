import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const tallyOnCloudContentSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      default: 'Tally on Cloud | Axatech',
    },
    metaDescription: {
      type: String,
      default: 'Run your existing Tally license securely on cloud and access it from anywhere.',
    },
    metaKeywords: {
      type: String,
      default:
        'tally on cloud, tally cloud hosting, remote access tally, work on tally anywhere, axatech tally',
    },
    label: {
      type: String,
      default: '3.1 Tally on Cloud',
    },
    title: {
      type: String,
      default: 'Access Tally Anytime, Anywhere - Securely',
    },
    subtitle: {
      type: String,
      default:
        'Run your existing Tally license on a managed cloud environment with uninterrupted access from any location.',
    },
    introText: {
      type: String,
      default:
        'Best suited for organizations that need secure remote access, reliable uptime, and smooth multi-branch Tally operations.',
    },
    benefitsTitle: {
      type: String,
      default: 'What You Get',
    },
    benefits: {
      type: [String],
      default: [
        'Access Tally from any Windows, Mac, or mobile device',
        'No data loss with automatic cloud backups',
        'Fast, low-latency remote desktop experience',
        'Managed and monitored by Axatech',
      ],
    },
    highlights: {
      type: [highlightSchema],
      default: [
        {
          title: 'Secure Anywhere Access',
          description:
            'Work on Tally from office, home, or travel locations with controlled and reliable access.',
        },
        {
          title: 'Business Continuity Built-In',
          description:
            'Keep operations running smoothly with managed backups, monitoring, and cloud uptime support.',
        },
        {
          title: 'Performance for Daily Teams',
          description:
            'Get responsive cloud usage designed for accounting teams, branches, and multi-location workflows.',
        },
      ],
    },
    idealForText: {
      type: String,
      default: 'Businesses with remote teams or multiple branches.',
    },
    ctaText: {
      type: String,
      default: 'Start Tally on Cloud',
    },
    ctaPath: {
      type: String,
      default: '/contact',
    },
  },
  { timestamps: true }
);

export default mongoose.model('TallyOnCloudContent', tallyOnCloudContentSchema);
