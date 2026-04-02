import mongoose from 'mongoose';

const securityPillarSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const tallySecurityControlContentSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      default: 'Security Control TDL | Axatech',
    },
    metaDescription: {
      type: String,
      default: 'Protect sensitive business data in Tally with security control TDL customizations.',
    },
    metaKeywords: {
      type: String,
      default:
        'security control tdl, tdl security control, tally security control, role based access tally, axatech',
    },
    label: {
      type: String,
      default: '5.1 Security Control TDL',
    },
    title: {
      type: String,
      default: 'Protect Your Sensitive Business Data',
    },
    subtitle: {
      type: String,
      default:
        'Granular access control, secure workflows, and audit-ready visibility built directly inside Tally.',
    },
    introText: {
      type: String,
      default:
        'Built for companies that need stronger process control, reduced misuse risk, and better compliance confidence.',
    },
    securityPillars: {
      type: [securityPillarSchema],
      default: [
        {
          title: 'Access Governance',
          description:
            'Role-based controls to ensure only authorized users can access sensitive Tally operations.',
        },
        {
          title: 'Process Control',
          description: 'Controlled workflows and permission layers to reduce operational risk and accidental changes.',
        },
        {
          title: 'Audit Visibility',
          description: 'Track key user actions with clear logs for internal compliance and accountability.',
        },
      ],
    },
    points: {
      type: [String],
      default: [
        'User-wise feature restriction (voucher entry, reports, masters)',
        'Password-based screen locks and data protection',
        'Activity logs and audit trails',
      ],
    },
    ctaText: {
      type: String,
      default: 'Request Security TDL',
    },
    ctaPath: {
      type: String,
      default: '/contact',
    },
  },
  { timestamps: true }
);

export default mongoose.model('TdlSecurityControlContent', tallySecurityControlContentSchema);

