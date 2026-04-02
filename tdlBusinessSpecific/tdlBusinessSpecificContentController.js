import TdlBusinessSpecificContent from './TdlBusinessSpecificContent.js';

const getDefaults = () => ({
  metaTitle: 'Business-Specific TDL | Axatech',
  metaDescription: 'Industry-specific TDL solutions built for your unique business workflow in Tally.',
  metaKeywords:
    'business specific tdl, industry specific tdl, custom tdl tally, workflow tdl customization, axatech',
  label: '5.5 Business-Specific TDL',
  title: 'Customizations for Your Industry',
  subtitle: 'Purpose-built TDL enhancements designed around industry workflows.',
  introText:
    'Tailored for businesses that need domain-focused customization, stronger process discipline, and better reporting reliability.',
  industryHighlights: [
    {
      title: 'Industry-Aligned Workflows',
      description: 'Create process-specific logic that aligns Tally with how your business actually operates.',
    },
    {
      title: 'Practical Operational Control',
      description: 'Capture the right data, enforce the right checks, and improve daily execution quality.',
    },
    {
      title: 'Scalable Custom Foundation',
      description:
        'Start with your current needs and extend smoothly as your teams, branches, and operations grow.',
    },
  ],
  points: [
    'Manufacturing: BOM, job work, production tracking',
    'Real estate: project-wise accounting, installment tracking',
    'Retail: POS integration, loyalty points, barcode',
    'Education, healthcare, hospitality and more',
  ],
  ctaText: 'Request Business-Specific TDL',
  ctaPath: '/contact',
});

const get = async (req, res) => {
  try {
    let content = await TdlBusinessSpecificContent.findOne().lean();
    if (!content) {
      content = await TdlBusinessSpecificContent.create(getDefaults());
      content = content.toObject();
    } else if (!content.metaKeywords) {
      content.metaKeywords = getDefaults().metaKeywords;
    }
    return res.json(content);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const existing = await TdlBusinessSpecificContent.findOne();
    if (existing) return res.status(400).json({ message: 'Content already exists' });
    const content = await TdlBusinessSpecificContent.create(req.body);
    return res.status(201).json(content);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await TdlBusinessSpecificContent.findOneAndUpdate({}, req.body, { new: true });
    if (!updated) {
      const created = await TdlBusinessSpecificContent.create({ ...getDefaults(), ...req.body });
      return res.status(201).json(created);
    }
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await TdlBusinessSpecificContent.findOneAndDelete({});
    return res.json({ message: deleted ? 'Content deleted' : 'No content found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default { get, create, update, remove };

