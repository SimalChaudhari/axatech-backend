import IntegrationExcelImportContent from './IntegrationExcelImportContent.js';

export const getIntegrationExcelImportContent = async (req, res) => {
  try {
    let content = await IntegrationExcelImportContent.findOne();
    if (!content) content = await IntegrationExcelImportContent.create({});
    if (content && (content.metaKeywords === undefined || content.metaKeywords === null)) {
      content.metaKeywords =
        IntegrationExcelImportContent.schema.paths.metaKeywords.defaultValue;
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createIntegrationExcelImportContent = async (req, res) => {
  try {
    const existing = await IntegrationExcelImportContent.findOne();
    if (existing) {
      return res.status(409).json({ message: 'Content already exists. Use update instead.' });
    }
    const content = await IntegrationExcelImportContent.create(req.body || {});
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateIntegrationExcelImportContent = async (req, res) => {
  try {
    const body = req.body || {};
    let content = await IntegrationExcelImportContent.findOne();
    if (!content) content = new IntegrationExcelImportContent();
    Object.keys(body).forEach((k) => {
      if (body[k] !== undefined) content[k] = body[k];
    });
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteIntegrationExcelImportContent = async (req, res) => {
  try {
    const content = await IntegrationExcelImportContent.findOne();
    if (!content) return res.status(404).json({ message: 'Content not found' });
    await IntegrationExcelImportContent.deleteOne({ _id: content._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

