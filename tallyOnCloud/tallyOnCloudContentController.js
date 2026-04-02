import TallyOnCloudContent from './TallyOnCloudContent.js';

export const getTallyOnCloudContent = async (req, res) => {
  try {
    let content = await TallyOnCloudContent.findOne();
    if (!content) content = await TallyOnCloudContent.create({});
    if (
      content &&
      (content.metaKeywords === undefined || content.metaKeywords === null)
    ) {
      // Ensure SEO keywords exist for older documents created before this field.
      content.metaKeywords =
        TallyOnCloudContent.schema.paths.metaKeywords.defaultValue;
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTallyOnCloudContent = async (req, res) => {
  try {
    const existing = await TallyOnCloudContent.findOne();
    if (existing) {
      return res.status(409).json({ message: 'Content already exists. Use update instead.' });
    }
    const content = await TallyOnCloudContent.create(req.body || {});
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTallyOnCloudContent = async (req, res) => {
  try {
    const body = req.body || {};
    let content = await TallyOnCloudContent.findOne();
    if (!content) content = new TallyOnCloudContent();
    Object.keys(body).forEach((k) => {
      if (body[k] !== undefined) content[k] = body[k];
    });
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTallyOnCloudContent = async (req, res) => {
  try {
    const content = await TallyOnCloudContent.findOne();
    if (!content) return res.status(404).json({ message: 'Content not found' });
    await TallyOnCloudContent.deleteOne({ _id: content._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
