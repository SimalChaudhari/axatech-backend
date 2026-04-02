import TdlMisReportingContent from './TdlMisReportingContent.js';

const getDefaults = () => ({
  metaTitle: 'MIS Reporting TDL | Axatech',
  metaDescription: 'Get custom MIS dashboards and reports directly inside Tally with TDL.',
  metaKeywords: 'mis reporting tdl, tdl mis reporting, tally mis reporting, business intelligence inside tally, axatech',
  label: '5.3 MIS Reporting TDL',
  title: 'Business Intelligence Inside Tally',
  subtitle: 'Custom MIS dashboards and reports for faster decisions without leaving Tally.',
  introText:
    'Designed for business owners and finance teams who need clear reporting, strong analysis, and faster action.',
  misReportingPillars: [
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
  points: [
    'Custom dashboards with key business metrics',
    'Profitability reports by product, branch, or salesperson',
    'Aging analysis, trend reports, and executive summaries',
    'Export to Excel or PDF with one click',
  ],
  ctaText: 'Request MIS TDL',
  ctaPath: '/contact',
});

const get = async (req, res) => {
  try {
    let content = await TdlMisReportingContent.findOne().lean();
    if (!content) {
      content = await TdlMisReportingContent.create(getDefaults());
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
    const existing = await TdlMisReportingContent.findOne();
    if (existing) return res.status(400).json({ message: 'Content already exists' });

    const content = await TdlMisReportingContent.create(req.body);
    return res.status(201).json(content);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await TdlMisReportingContent.findOneAndUpdate({}, req.body, { new: true });
    if (!updated) {
      const created = await TdlMisReportingContent.create({ ...getDefaults(), ...req.body });
      return res.status(201).json(created);
    }
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await TdlMisReportingContent.findOneAndDelete({});
    return res.json({ message: deleted ? 'Content deleted' : 'No content found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default { get, create, update, remove };

