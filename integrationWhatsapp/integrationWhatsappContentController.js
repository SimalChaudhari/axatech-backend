import IntegrationWhatsappContent from './IntegrationWhatsappContent.js';

export const getIntegrationWhatsappContent = async (req, res) => {
  try {
    let content = await IntegrationWhatsappContent.findOne();
    if (!content) content = await IntegrationWhatsappContent.create({});
    if (content && (content.metaKeywords === undefined || content.metaKeywords === null)) {
      content.metaKeywords =
        IntegrationWhatsappContent.schema.paths.metaKeywords.defaultValue;
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createIntegrationWhatsappContent = async (req, res) => {
  try {
    const existing = await IntegrationWhatsappContent.findOne();
    if (existing) {
      return res.status(409).json({ message: 'Content already exists. Use update instead.' });
    }
    const content = await IntegrationWhatsappContent.create(req.body || {});
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateIntegrationWhatsappContent = async (req, res) => {
  try {
    const body = req.body || {};
    let content = await IntegrationWhatsappContent.findOne();
    if (!content) content = new IntegrationWhatsappContent();
    Object.keys(body).forEach((k) => {
      if (body[k] !== undefined) content[k] = body[k];
    });
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteIntegrationWhatsappContent = async (req, res) => {
  try {
    const content = await IntegrationWhatsappContent.findOne();
    if (!content) return res.status(404).json({ message: 'Content not found' });
    await IntegrationWhatsappContent.deleteOne({ _id: content._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

