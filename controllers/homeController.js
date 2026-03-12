import HomeContent from '../models/HomeContent.js';

export const getHomeContent = async (req, res) => {
  try {
    let content = await HomeContent.findOne();
    if (!content) content = await HomeContent.create({});
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateHomeContent = async (req, res) => {
  try {
    const body = req.body;
    let content = await HomeContent.findOne();
    if (!content) content = new HomeContent();
    Object.keys(body).forEach((k) => { if (body[k] !== undefined) content[k] = body[k]; });
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
