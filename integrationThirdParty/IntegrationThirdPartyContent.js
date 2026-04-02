import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const integrationThirdPartyContentSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: 'Third-Party Application Integration | Axatech' },
    metaDescription: {
      type: String,
      default: 'Connect Tally with ERP, CRM and e-commerce systems using API, XML, JSON and ODBC.',
    },
    metaKeywords: {
      type: String,
      default:
        'tally integration, third party integration, ERP integration, CRM integration, e-commerce integration, API XML JSON ODBC',
    },
    label: { type: String, default: '6.2 Third-Party Application Integration' },
    title: { type: String, default: 'Connect Tally with Your Business Software' },
    subtitle: {
      type: String,
      default:
        'Build robust integrations for seamless data flow between Tally and your existing tools.',
    },
    introText: {
      type: String,
      default:
        'Ideal for growing businesses that want a single source of truth across finance and operational platforms.',
    },
    highlights: {
      type: [highlightSchema],
      default: [
        {
          title: 'Connected Business Stack',
          description:
            'Integrate Tally with your ERP, CRM, ecommerce, and internal tools for unified operations.',
        },
        {
          title: 'Secure Data Exchange',
          description:
            'Enable reliable bi-directional sync with controlled data mapping and validation logic.',
        },
        {
          title: 'Flexible Integration Modes',
          description: 'Support real-time and scheduled sync patterns based on your process requirements.',
        },
      ],
    },
    points: {
      type: [String],
      default: [
        'REST API, XML, JSON based two-way data sync',
        'Integrate with ERP systems, e-commerce platforms and CRMs',
        'Real-time or scheduled sync as per your workflow',
        'Supports API and ODBC based integration approaches',
      ],
    },
    ctaText: { type: String, default: 'Request Integration' },
    ctaPath: { type: String, default: '/contact' },
  },
  { timestamps: true }
);

export default mongoose.model(
  'IntegrationThirdPartyContent',
  integrationThirdPartyContentSchema
);

