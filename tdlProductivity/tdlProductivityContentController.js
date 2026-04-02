import TdlProductivityContent from './TdlProductivityContent.js';

const getDefaults = () => ({
  metaTitle: 'Productivity TDL | Axatech',
  metaDescription: 'Speed up daily Tally operations with productivity-focused TDL customizations.',
  metaKeywords:
    'productivity tdl, tdl productivity, tally productivity, smart defaults tally, workflow automation tally, axatech',
  label: '5.2 Productivity TDL',
  title: 'Speed Up Your Daily Tally Operations',
  subtitle: 'Automation and process acceleration to help your team complete more work in less time.',
  introText:
    'Ideal for businesses handling high daily voucher volumes and teams that need speed without sacrificing control.',
  productivityPillars: [
    {
      title: 'Faster Data Entry',
      description: 'Smart defaults and assisted workflows reduce repetitive effort for day-to-day accounting.',
    },
    {
      title: 'Workflow Automation',
      description: 'Automated steps and custom shortcuts ensure teams complete tasks consistently and quickly.',
    },
    {
      title: 'Operational Accuracy',
      description: 'Standardized processes lower manual mistakes and improve reliability of business records.',
    },
  ],
  points: [
    'Auto-fill and smart defaults for faster entry',
    'Batch voucher processing',
    'Custom shortcuts and workflow automation',
    'Reduce data entry time by up to 60%',
  ],
  ctaText: 'Request Productivity TDL',
  ctaPath: '/contact',
});

const get = async (req, res) => {
  try {
    let content = await TdlProductivityContent.findOne().lean();
    if (!content) {
      content = await TdlProductivityContent.create(getDefaults());
      content = content.toObject();
    } else {
      // Backward compatibility: ensure metaKeywords exists.
      if (!content.metaKeywords) content.metaKeywords = getDefaults().metaKeywords;
    }
    return res.json(content);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const existing = await TdlProductivityContent.findOne();
    if (existing) return res.status(400).json({ message: 'Content already exists' });

    const content = await TdlProductivityContent.create(req.body);
    return res.status(201).json(content);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await TdlProductivityContent.findOneAndUpdate({}, req.body, { new: true });
    if (!updated) {
      const created = await TdlProductivityContent.create({ ...getDefaults(), ...req.body });
      return res.status(201).json(created);
    }
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await TdlProductivityContent.findOneAndDelete({});
    return res.json({ message: deleted ? 'Content deleted' : 'No content found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default { get, create, update, remove };

