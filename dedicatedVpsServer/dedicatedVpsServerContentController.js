import DedicatedVpsServerContent from './DedicatedVpsServerContent.js';

export const getDedicatedVpsServerContent = async (req, res) => {
  try {
    let content = await DedicatedVpsServerContent.findOne();
    if (!content) content = await DedicatedVpsServerContent.create({});

    if (
      content &&
      (content.metaKeywords === undefined || content.metaKeywords === null)
    ) {
      // Backward compat: ensure keywords exist for older docs.
      content.metaKeywords =
        DedicatedVpsServerContent.schema.paths.metaKeywords.defaultValue;
    }

    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createDedicatedVpsServerContent = async (req, res) => {
  try {
    const existing = await DedicatedVpsServerContent.findOne();
    if (existing) {
      return res.status(409).json({ message: 'Content already exists. Use update instead.' });
    }
    const content = await DedicatedVpsServerContent.create(req.body || {});
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateDedicatedVpsServerContent = async (req, res) => {
  try {
    const body = req.body || {};
    let content = await DedicatedVpsServerContent.findOne();
    if (!content) content = new DedicatedVpsServerContent();

    Object.keys(body).forEach((k) => {
      if (body[k] !== undefined) content[k] = body[k];
    });

    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteDedicatedVpsServerContent = async (req, res) => {
  try {
    const content = await DedicatedVpsServerContent.findOne();
    if (!content) return res.status(404).json({ message: 'Content not found' });

    await DedicatedVpsServerContent.deleteOne({ _id: content._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

