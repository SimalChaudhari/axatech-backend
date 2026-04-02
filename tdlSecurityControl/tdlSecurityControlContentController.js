import TdlSecurityControlContent from './TdlSecurityControlContent.js';

export const getTdlSecurityControlContent = async (req, res) => {
  try {
    let content = await TdlSecurityControlContent.findOne();
    if (!content) content = await TdlSecurityControlContent.create({});

    if (content && (content.metaKeywords === undefined || content.metaKeywords === null)) {
      content.metaKeywords =
        TdlSecurityControlContent.schema.paths.metaKeywords.defaultValue;
    }

    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTdlSecurityControlContent = async (req, res) => {
  try {
    const existing = await TdlSecurityControlContent.findOne();
    if (existing) {
      return res.status(409).json({ message: 'Content already exists. Use update instead.' });
    }
    const content = await TdlSecurityControlContent.create(req.body || {});
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTdlSecurityControlContent = async (req, res) => {
  try {
    const body = req.body || {};
    let content = await TdlSecurityControlContent.findOne();
    if (!content) content = new TdlSecurityControlContent();

    Object.keys(body).forEach((k) => {
      if (body[k] !== undefined) content[k] = body[k];
    });

    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTdlSecurityControlContent = async (req, res) => {
  try {
    const content = await TdlSecurityControlContent.findOne();
    if (!content) return res.status(404).json({ message: 'Content not found' });
    await TdlSecurityControlContent.deleteOne({ _id: content._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

