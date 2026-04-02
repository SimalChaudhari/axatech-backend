import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const offeringSchema = new mongoose.Schema(
  {
    label: String,
    title: String,
    points: { type: [String], default: [] },
  },
  { _id: false }
);

const webAppDevelopmentContentSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: 'Web & App Development | Axatech' },
    metaDescription: {
      type: String,
      default:
        'End-to-end web and app development services by Axatech including frontend, backend, APIs, cloud, ERP, SaaS, and Tally-connected solutions.',
    },
    metaKeywords: {
      type: String,
      default:
        'web app development, mobile app development, api development, cloud solutions, erp software development, saas development, axatech',
    },
    label: { type: String, default: 'Web & App Development' },
    title: { type: String, default: 'Build Digital. Build Smart. Build with Axatech.' },
    subtitle: {
      type: String,
      default:
        'From dynamic websites to enterprise-grade mobile apps, Axatech delivers end-to-end digital solutions that are fast, scalable, and built for Indian businesses.',
    },
    introText: {
      type: String,
      default:
        'We design and build secure, scalable web and mobile solutions that align with your workflows and growth goals.',
    },
    highlights: {
      type: [highlightSchema],
      default: [
        {
          title: 'End-to-End Delivery',
          description: 'From strategy and UI to deployment, monitoring, and support under one team.',
        },
        {
          title: 'Built for Scale',
          description: 'Architecture-first approach to keep your product fast, stable, and future-ready.',
        },
        {
          title: 'Business-First Outcomes',
          description:
            'Every feature is aligned with growth, operations, and measurable business impact.',
        },
      ],
    },
    offerings: {
      type: [offeringSchema],
      default: [
        {
          label: '1. Frontend Development',
          title: "Your users' first impression - made to last.",
          points: [
            'Pixel-perfect, responsive UI/UX design',
            'Cross-browser and cross-device compatibility',
            'Performance-optimized for fast load times',
            'Accessibility and SEO-friendly markup',
          ],
        },
        {
          label: '2. Backend Development',
          title: 'Robust, secure, and scalable server-side systems.',
          points: [
            'RESTful API design and development',
            'Authentication, authorization and session management',
            'Database architecture and query optimization',
            'Microservices and monolith architectures',
          ],
        },
        {
          label: '3. JavaScript Technologies',
          title: 'Full-stack JavaScript expertise - one language, end to end.',
          points: [
            'Unified codebase across frontend and backend',
            'Real-time features with WebSockets and event-driven architecture',
            'Faster development cycles with shared libraries and tooling',
          ],
        },
        {
          label: '4. API Development',
          title: 'Connect everything - internal systems, third parties, and mobile apps.',
          points: [
            'REST and GraphQL API design',
            'API documentation with Swagger/Postman',
            'Rate limiting, versioning and security best practices',
            'Webhook integrations and event-driven APIs',
          ],
        },
        {
          label: '5. Mobile App Development',
          title: 'Native-quality apps on Android and iOS - built once, deployed everywhere.',
          points: [
            'Cross-platform apps with React Native',
            'Tally-connected mobile apps (your business data on phone)',
            'Push notifications, offline support and device integrations',
            'Play Store and App Store deployment support',
          ],
        },
        {
          label: '6. Cloud Solutions',
          title: 'Deploy, scale, and manage your apps without infrastructure headaches.',
          points: [
            'Cloud hosting on AWS, Azure, or DigitalOcean',
            'CI/CD pipelines for automated deployments',
            'Docker/container-based architecture',
            'Monitoring, logging and auto-scaling setup',
          ],
        },
        {
          label: '7. ERP / Business Software Development',
          title: 'Custom ERP tailored for Indian SMEs.',
          points: ['Inventory, billing, HR, and payroll modules', 'Naturally connects to your Tally expertise'],
        },
        {
          label: '8. SaaS Product Development',
          title: 'Help clients build and launch their own SaaS.',
          points: [
            'Subscription billing via Razorpay',
            'Multi-tenant architecture',
            'Strong upsell from regular web development',
          ],
        },
        {
          label: '9. Tally-Connected Web Apps',
          title: 'Your biggest differentiator - Tally + web/app in one solution.',
          points: [
            'Web dashboards pulling live data from Tally',
            'Customer portals showing outstanding and invoices',
            'Salesperson apps connected to Tally stock and pricing',
          ],
        },
        {
          label: '10. WhatsApp Business Automation',
          title: 'Automate sales follow-ups and customer communication.',
          points: [
            'Chatbot for order status and invoice sharing',
            'Automated follow-ups and payment reminders',
            'Works as a standalone offering too',
          ],
        },
        {
          label: '11. Digital Marketing / SEO',
          title: 'Natural add-on service for every website project.',
          points: ['Website SEO for small businesses', 'Google My Business setup'],
        },
      ],
    },
    ctaText: { type: String, default: 'Talk To Our Team' },
    ctaPath: { type: String, default: '/contact' },
  },
  { timestamps: true }
);

export default mongoose.model('WebAppDevelopmentContent', webAppDevelopmentContentSchema);

