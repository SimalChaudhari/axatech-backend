import WebAppDevelopmentContent from './WebAppDevelopmentContent.js';

const getDefaults = () => ({
  metaTitle: 'Web & App Development | Axatech',
  metaDescription:
    'End-to-end web and app development services by Axatech including frontend, backend, APIs, cloud, ERP, SaaS, and Tally-connected solutions.',
  metaKeywords:
    'web app development, mobile app development, api development, cloud solutions, erp software development, saas development, axatech',
  label: 'Web & App Development',
  title: 'Build Digital. Build Smart. Build with Axatech.',
  subtitle:
    'From dynamic websites to enterprise-grade mobile apps, Axatech delivers end-to-end digital solutions that are fast, scalable, and built for Indian businesses.',
  introText:
    'We design and build secure, scalable web and mobile solutions that align with your workflows and growth goals.',
  highlights: [
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
      description: 'Every feature is aligned with growth, operations, and measurable business impact.',
    },
  ],
  offerings: [
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
  ctaText: 'Talk To Our Team',
  ctaPath: '/contact',
});

const get = async (req, res) => {
  try {
    let content = await WebAppDevelopmentContent.findOne().lean();
    if (!content) {
      content = await WebAppDevelopmentContent.create(getDefaults());
      content = content.toObject();
    } else {
      const defaults = getDefaults();
      if (!content.metaKeywords) content.metaKeywords = defaults.metaKeywords;
      if (!content.introText) content.introText = defaults.introText;
      if (!Array.isArray(content.highlights) || content.highlights.length === 0) content.highlights = defaults.highlights;
      if (!Array.isArray(content.offerings) || content.offerings.length < defaults.offerings.length) {
        content.offerings = defaults.offerings;
      }
    }
    return res.json(content);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const existing = await WebAppDevelopmentContent.findOne();
    if (existing) return res.status(400).json({ message: 'Content already exists' });
    const content = await WebAppDevelopmentContent.create(req.body);
    return res.status(201).json(content);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await WebAppDevelopmentContent.findOneAndUpdate({}, req.body, { new: true });
    if (!updated) {
      const created = await WebAppDevelopmentContent.create({ ...getDefaults(), ...req.body });
      return res.status(201).json(created);
    }
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await WebAppDevelopmentContent.findOneAndDelete({});
    return res.json({ message: deleted ? 'Content deleted' : 'No content found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default { get, create, update, remove };

