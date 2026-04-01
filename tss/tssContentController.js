import TssContent from './TssContent.js';

export const getTssContent = async (req, res) => {
  try {
    let content = await TssContent.findOne();
    if (!content) content = await TssContent.create({});
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTssContent = async (req, res) => {
  try {
    const body = req.body;
    let content = await TssContent.findOne();
    if (!content) content = new TssContent();
    Object.keys(body).forEach((k) => {
      if (body[k] !== undefined) content[k] = body[k];
    });
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

