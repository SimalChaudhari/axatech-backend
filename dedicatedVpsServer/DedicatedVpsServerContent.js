import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const dedicatedVpsServerContentSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      default: 'Dedicated VPS Server | Axatech',
    },
    metaDescription: {
      type: String,
      default:
        'Dedicated VPS server plans for Tally with full control, custom resources and enterprise-grade uptime.',
    },
    metaKeywords: {
      type: String,
      default:
        'dedicated vps, dedicated virtual server, vps for tally, remote access tally, axatech dedicated vps',
    },
    label: {
      type: String,
      default: '3.2 Dedicated VPS Server',
    },
    title: {
      type: String,
      default: 'Dedicated Performance for Growing Businesses',
    },
    subtitle: {
      type: String,
      default:
        'For businesses needing full control and dedicated resources for cloud-hosted Tally.',
    },
    introText: {
      type: String,
      default:
        'Ideal for businesses that require dedicated resources, stronger control, and predictable cloud performance for critical workloads.',
    },
    highlights: {
      type: [highlightSchema],
      default: [
        {
          title: 'Dedicated Resource Isolation',
          description:
            'Run mission-critical workloads on isolated compute resources without shared-server bottlenecks.',
        },
        {
          title: 'Configurable Infrastructure',
          description:
            'Scale RAM, CPU, storage, and network resources based on your operational and growth needs.',
        },
        {
          title: 'Enterprise-Grade Reliability',
          description:
            'Maintain stable uptime and performance for finance teams and multi-branch business operations.',
        },
      ],
    },
    features: {
      type: [String],
      default: [
        'Dedicated virtual server with no shared resources',
        'Custom RAM, storage, and bandwidth configuration',
        'Root access with full server control',
        '99.9% uptime SLA with 24/7 monitoring',
      ],
    },
    plans: {
      type: [String],
      default: [
        'Basic VPS - For small businesses (2 vCPU, 4GB RAM)',
        'Standard VPS - For growing teams (4 vCPU, 8GB RAM)',
        'Premium VPS - For enterprises (8 vCPU, 16GB RAM+)',
      ],
    },
    ctaText: {
      type: String,
      default: 'Request Dedicated VPS',
    },
    ctaPath: {
      type: String,
      default: '/contact',
    },
  },
  { timestamps: true }
);

export default mongoose.model('DedicatedVpsServerContent', dedicatedVpsServerContentSchema);

