import IntegrationThirdPartyContent from './IntegrationThirdPartyContent.js';

export const getIntegrationThirdPartyContent = async (req, res) => {
  try {
    let content = await IntegrationThirdPartyContent.findOne();
    if (!content) content = await IntegrationThirdPartyContent.create({});
    if (
      content &&
      (content.metaKeywords === undefined || content.metaKeywords === null)
    ) {
      content.metaKeywords =
        IntegrationThirdPartyContent.schema.paths.metaKeywords.defaultValue;
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createIntegrationThirdPartyContent = async (req, res) => {
  try {
    const existing = await IntegrationThirdPartyContent.findOne();
    if (existing) {
      return res
        .status(409)
        .json({ message: 'Content already exists. Use update instead.' });
    }
    const content = await IntegrationThirdPartyContent.create(req.body || {});
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateIntegrationThirdPartyContent = async (req, res) => {
  try {
    const body = req.body || {};
    let content = await IntegrationThirdPartyContent.findOne();
    if (!content) content = new IntegrationThirdPartyContent();
    Object.keys(body).forEach((k) => {
      if (body[k] !== undefined) content[k] = body[k];
    });
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteIntegrationThirdPartyContent = async (req, res) => {
  try {
    const content = await IntegrationThirdPartyContent.findOne();
    if (!content) return res.status(404).json({ message: 'Content not found' });
    await IntegrationThirdPartyContent.deleteOne({ _id: content._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

