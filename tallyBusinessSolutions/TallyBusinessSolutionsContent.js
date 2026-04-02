import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const solutionSchema = new mongoose.Schema(
  {
    label: String,
    title: String,
    points: [String],
  },
  { _id: false }
);

const tallyBusinessSolutionsContentSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: 'Tally Business Solutions | Axatech' },
    metaDescription: {
      type: String,
      default:
        'Tally business solutions including data synchronization, e-invoice, e-way bill, migration, training, and health audits.',
    },
    metaKeywords: {
      type: String,
      default:
        'tally business solutions, tally synchronization, e-invoice tally, e-way bill tally, tally migration, tally audit',
    },
    pageLabel: { type: String, default: 'Tally Services' },
    pageTitle: { type: String, default: 'Advanced Tally Solutions for Growing Businesses' },
    pageSubtitle: {
      type: String,
      default:
        'Explore specialized Tally services that improve control, compliance, and operational efficiency.',
    },
    introText: {
      type: String,
      default:
        'End-to-end Tally business services tailored to simplify operations, strengthen compliance, and support sustainable growth.',
    },
    highlights: {
      type: [highlightSchema],
      default: [
        {
          title: 'Compliance and Control',
          description:
            'Implement practical Tally solutions that improve governance, reporting quality, and process discipline.',
        },
        {
          title: 'Integrated Operations',
          description:
            'Connect branches, teams, and workflows with synchronized data and dependable business continuity.',
        },
        {
          title: 'Scalable Growth Enablement',
          description:
            'Adopt future-ready Tally capabilities that support expansion without operational complexity.',
        },
      ],
    },
    solutions: {
      type: [solutionSchema],
      default: [
        {
          label: '8. Tally Data Synchronization',
          title: 'One Tally. Multiple Locations. Always in Sync.',
          points: [
            'Manage data across branches, godowns, and offices in one master Tally company.',
            'Branch-to-HO synchronization',
            'Configurable sync rules (voucher types, periods, and filters)',
            'Works over internet or LAN',
            'Conflict resolution and sync logs',
            'Ideal for retail chains, distributors, and multi-branch businesses',
          ],
        },
        {
          label: '9. E-Invoice & E-Way Bill Solutions',
          title: 'Faster Compliance with Fewer Errors',
          points: [
            'E-Invoice generation directly from Tally',
            'Bulk E-Way Bill creation and cancellation',
            'IRN generation with QR code printing',
            'GST reconciliation (GSTR-2A/2B vs Books)',
            'High-demand solution for Indian businesses',
          ],
        },
        {
          label: '10. Tally Training & Onboarding',
          title: 'Train Teams from Basics to Advanced Tally Prime',
          points: [
            'Basic to advanced Tally Prime training',
            'GST filing process using Tally',
            'Group and corporate training for accounting teams',
            'Useful as a recurring service stream',
          ],
        },
        {
          label: '11. Tally Data Migration',
          title: 'Smooth Migration Without Data Chaos',
          points: [
            'Migration from Tally ERP 9 to Tally Prime',
            'Migration from Busy, Marg, and Miracle to Tally',
            'Data cleaning and restructuring before migration',
            'Best for businesses switching accounting platforms',
          ],
        },
        {
          label: '12. Tally Health Check / Audit',
          title: 'Find Issues Early. Keep Books Clean.',
          points: [
            'Data integrity audit',
            'Duplicate entry detection',
            'Mismatch reports (stock, ledger, GST)',
            'One-time paid audit service with actionable fixes',
          ],
        },
      ],
    },
    ctaText: { type: String, default: 'Request Consultation' },
    ctaPath: { type: String, default: '/contact' },
  },
  { timestamps: true }
);

export default mongoose.model(
  'TallyBusinessSolutionsContent',
  tallyBusinessSolutionsContentSchema
);

