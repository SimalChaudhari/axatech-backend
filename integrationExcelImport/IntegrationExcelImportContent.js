import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const integrationExcelImportContentSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: 'Excel Import Integration | Axatech' },
    metaDescription: {
      type: String,
      default: 'Import bulk vouchers and master data into Tally directly from Excel.',
    },
    metaKeywords: {
      type: String,
      default:
        'excel import tally, tally excel integration, bulk voucher import, tally data migration, axatech integration',
    },
    label: { type: String, default: '6.1 Excel Import' },
    title: { type: String, default: 'Bulk Data Import from Excel to Tally' },
    subtitle: {
      type: String,
      default:
        'Eliminate manual entry and move your Excel data into Tally in a structured, repeatable way.',
    },
    introText: {
      type: String,
      default:
        'Best for teams handling frequent Excel-based accounting data who want faster throughput and cleaner books.',
    },
    highlights: {
      type: [highlightSchema],
      default: [
        {
          title: 'Bulk Import Efficiency',
          description:
            'Move large volumes of voucher and master data into Tally in minutes instead of manual hours.',
        },
        {
          title: 'Template-Based Accuracy',
          description:
            'Use structured mapping templates to reduce errors and keep imports consistent across teams.',
        },
        {
          title: 'Repeatable Workflows',
          description:
            'Standardize recurring import operations for faster monthly processes and better control.',
        },
      ],
    },
    points: {
      type: [String],
      default: [
        'Sales, purchase, journal and payment vouchers from Excel',
        'Master data import: ledgers, stock items, parties',
        'Configurable templates for your existing Excel formats',
        'One-click recurring imports',
      ],
    },
    ctaText: { type: String, default: 'Request Excel Import Setup' },
    ctaPath: { type: String, default: '/contact' },
  },
  { timestamps: true }
);

export default mongoose.model(
  'IntegrationExcelImportContent',
  integrationExcelImportContentSchema
);

