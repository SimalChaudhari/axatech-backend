import TdlInvoiceContent from './TdlInvoiceContent.js';

const getDefaults = () => ({
  metaTitle: 'Invoice TDL | Axatech',
  metaDescription: 'Build branded, professional invoice formats in Tally with custom invoice TDL.',
  metaKeywords: 'invoice tdl, custom invoice tally, branded invoice tally, invoice format tally, axatech',
  label: '5.4 Invoice TDL',
  title: 'Professional Invoices, Your Brand Identity',
  subtitle: 'Create industry-ready invoice formats that match your business standards.',
  introText:
    'Built for businesses that need accurate, compliant, and professionally branded invoices directly from Tally.',
  invoiceHighlights: [
    {
      title: 'Brand-Perfect Output',
      description: 'Design invoice templates that reflect your identity with clean branding, terms, and formatting.',
    },
    {
      title: 'Business-Specific Formats',
      description: 'Build layouts suited for your workflow across product lines, billing models, and industries.',
    },
    {
      title: 'Faster Billing Operations',
      description: 'Reduce manual effort with smart data placement and reliable print/export-ready invoice templates.',
    },
  ],
  points: [
    'Custom invoice formats with logo, terms and branding',
    'Multi-format support (A4, A5, thermal/POS)',
    'Auto-fill bank details, QR codes, and digital signatures',
    'Industry-specific formats (retail, pharma, manufacturing)',
  ],
  ctaText: 'Request Invoice TDL',
  ctaPath: '/contact',
});

const get = async (req, res) => {
  try {
    let content = await TdlInvoiceContent.findOne().lean();
    if (!content) {
      content = await TdlInvoiceContent.create(getDefaults());
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
    const existing = await TdlInvoiceContent.findOne();
    if (existing) return res.status(400).json({ message: 'Content already exists' });
    const content = await TdlInvoiceContent.create(req.body);
    return res.status(201).json(content);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await TdlInvoiceContent.findOneAndUpdate({}, req.body, { new: true });
    if (!updated) {
      const created = await TdlInvoiceContent.create({ ...getDefaults(), ...req.body });
      return res.status(201).json(created);
    }
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await TdlInvoiceContent.findOneAndDelete({});
    return res.json({ message: deleted ? 'Content deleted' : 'No content found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default { get, create, update, remove };

