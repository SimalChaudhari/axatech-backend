import mongoose from 'mongoose';

const misReportingPillarSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const tdlMisReportingContentSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: 'MIS Reporting TDL | Axatech' },
    metaDescription: {
      type: String,
      default: 'Get custom MIS dashboards and reports directly inside Tally with TDL.',
    },
    metaKeywords: {
      type: String,
      default:
        'mis reporting tdl, tdl mis reporting, tally mis reporting, business intelligence inside tally, axatech',
    },
    label: { type: String, default: '5.3 MIS Reporting TDL' },
    title: { type: String, default: 'Business Intelligence Inside Tally' },
    subtitle: {
      type: String,
      default: 'Custom MIS dashboards and reports for faster decisions without leaving Tally.',
    },
    introText: {
      type: String,
      default:
        'Designed for business owners and finance teams who need clear reporting, strong analysis, and faster action.',
    },
    misReportingPillars: {
      type: [misReportingPillarSchema],
      default: [
        {
          title: 'Executive Visibility',
          description: 'See key financial and operational KPIs in one place for faster leadership decisions.',
        },
        {
          title: 'Decision-Ready Insights',
          description: 'Actionable profitability, aging, and trend reports designed for practical business planning.',
        },
        {
          title: 'Faster Review Cycles',
          description: 'Generate, review, and export MIS outputs quickly for monthly and quarterly reporting needs.',
        },
      ],
    },
    points: {
      type: [String],
      default: [
        'Custom dashboards with key business metrics',
        'Profitability reports by product, branch, or salesperson',
        'Aging analysis, trend reports, and executive summaries',
        'Export to Excel or PDF with one click',
      ],
    },
    ctaText: { type: String, default: 'Request MIS TDL' },
    ctaPath: { type: String, default: '/contact' },
  },
  { timestamps: true }
);

export default mongoose.model('TdlMisReportingContent', tdlMisReportingContentSchema);

