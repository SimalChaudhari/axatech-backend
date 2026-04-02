import TallyBusinessSolutionsContent from './TallyBusinessSolutionsContent.js';

export const getTallyBusinessSolutionsContent = async (req, res) => {
  try {
    let content = await TallyBusinessSolutionsContent.findOne();
    if (!content) content = await TallyBusinessSolutionsContent.create({});
    if (content && (content.metaKeywords === undefined || content.metaKeywords === null)) {
      content.metaKeywords =
        TallyBusinessSolutionsContent.schema.paths.metaKeywords.defaultValue;
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTallyBusinessSolutionsContent = async (req, res) => {
  try {
    const existing = await TallyBusinessSolutionsContent.findOne();
    if (existing) {
      return res.status(409).json({ message: 'Content already exists. Use update instead.' });
    }
    const content = await TallyBusinessSolutionsContent.create(req.body || {});
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTallyBusinessSolutionsContent = async (req, res) => {
  try {
    const body = req.body || {};
    let content = await TallyBusinessSolutionsContent.findOne();
    if (!content) content = new TallyBusinessSolutionsContent();
    Object.keys(body).forEach((k) => {
      if (body[k] !== undefined) content[k] = body[k];
    });
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTallyBusinessSolutionsContent = async (req, res) => {
  try {
    const content = await TallyBusinessSolutionsContent.findOne();
    if (!content) return res.status(404).json({ message: 'Content not found' });
    await TallyBusinessSolutionsContent.deleteOne({ _id: content._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

