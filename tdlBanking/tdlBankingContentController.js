import TdlBankingContent from './TdlBankingContent.js';

const getDefaults = () => ({
  metaTitle: 'Banking TDL | Axatech',
  metaDescription: 'Streamline bank workflows in Tally with custom banking TDL automation.',
  metaKeywords:
    'banking tdl, bank reconciliation tally, cheque printing tally, neft rtgs export tally, axatech',
  label: '5.6 Banking TDL',
  title: 'Streamline Banking Workflows in Tally',
  subtitle: 'Automate key banking operations and reduce manual effort.',
  introText:
    'Ideal for organizations that need stronger banking control, cleaner payment execution, and less manual processing in Tally.',
  bankingHighlights: [
    {
      title: 'Reliable Financial Accuracy',
      description: 'Improve daily control over bank entries, reconciliation, and payment records across accounts.',
    },
    {
      title: 'Process Automation at Scale',
      description: 'Automate repeatable banking operations to reduce manual touchpoints and operational delays.',
    },
    {
      title: 'Faster Treasury Execution',
      description: 'Support smoother payment cycles with structured output formats aligned to banking workflows.',
    },
  ],
  points: [
    'Bank reconciliation automation',
    'Cheque printing in bank-specific formats',
    'Payment advice generation',
    'NEFT/RTGS file export for multiple banks',
  ],
  ctaText: 'Request Banking TDL',
  ctaPath: '/contact',
});

const get = async (req, res) => {
  try {
    let content = await TdlBankingContent.findOne().lean();
    if (!content) {
      content = await TdlBankingContent.create(getDefaults());
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
    const existing = await TdlBankingContent.findOne();
    if (existing) return res.status(400).json({ message: 'Content already exists' });
    const content = await TdlBankingContent.create(req.body);
    return res.status(201).json(content);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await TdlBankingContent.findOneAndUpdate({}, req.body, { new: true });
    if (!updated) {
      const created = await TdlBankingContent.create({ ...getDefaults(), ...req.body });
      return res.status(201).json(created);
    }
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await TdlBankingContent.findOneAndDelete({});
    return res.json({ message: deleted ? 'Content deleted' : 'No content found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default { get, create, update, remove };

