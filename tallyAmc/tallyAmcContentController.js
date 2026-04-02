import TallyAmcContent from './TallyAmcContent.js';

export const getTallyAmcContent = async (req, res) => {
  try {
    let content = await TallyAmcContent.findOne();
    if (!content) content = await TallyAmcContent.create({});
    if (content && (content.metaKeywords === undefined || content.metaKeywords === null)) {
      content.metaKeywords = TallyAmcContent.schema.paths.metaKeywords.defaultValue;
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTallyAmcContent = async (req, res) => {
  try {
    const existing = await TallyAmcContent.findOne();
    if (existing) {
      return res.status(409).json({ message: 'Content already exists. Use update instead.' });
    }
    const content = await TallyAmcContent.create(req.body || {});
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTallyAmcContent = async (req, res) => {
  try {
    const body = req.body || {};
    let content = await TallyAmcContent.findOne();
    if (!content) content = new TallyAmcContent();
    Object.keys(body).forEach((k) => {
      if (body[k] !== undefined) content[k] = body[k];
    });
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTallyAmcContent = async (req, res) => {
  try {
    const content = await TallyAmcContent.findOne();
    if (!content) return res.status(404).json({ message: 'Content not found' });
    await TallyAmcContent.deleteOne({ _id: content._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

