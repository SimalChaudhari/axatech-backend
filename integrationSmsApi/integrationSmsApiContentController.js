import IntegrationSmsApiContent from './IntegrationSmsApiContent.js';

export const getIntegrationSmsApiContent = async (req, res) => {
  try {
    let content = await IntegrationSmsApiContent.findOne();
    if (!content) content = await IntegrationSmsApiContent.create({});
    if (content && (content.metaKeywords === undefined || content.metaKeywords === null)) {
      content.metaKeywords = IntegrationSmsApiContent.schema.paths.metaKeywords.defaultValue;
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createIntegrationSmsApiContent = async (req, res) => {
  try {
    const existing = await IntegrationSmsApiContent.findOne();
    if (existing) {
      return res.status(409).json({ message: 'Content already exists. Use update instead.' });
    }
    const content = await IntegrationSmsApiContent.create(req.body || {});
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateIntegrationSmsApiContent = async (req, res) => {
  try {
    const body = req.body || {};
    let content = await IntegrationSmsApiContent.findOne();
    if (!content) content = new IntegrationSmsApiContent();
    Object.keys(body).forEach((k) => {
      if (body[k] !== undefined) content[k] = body[k];
    });
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteIntegrationSmsApiContent = async (req, res) => {
  try {
    const content = await IntegrationSmsApiContent.findOne();
    if (!content) return res.status(404).json({ message: 'Content not found' });
    await IntegrationSmsApiContent.deleteOne({ _id: content._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

