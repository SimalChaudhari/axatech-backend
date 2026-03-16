import Blog from './Blog.js';

const baseUrl = (req) => req ? `${req.protocol}://${req.get('host')}` : '';

export const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, all } = req.query;
    const filter = {};
    if (!all) filter.published = true;
    const skip = (Number(page) - 1) * Number(limit);
    const [blogs, total] = await Promise.all([
      Blog.find(filter).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(Number(limit)),
      Blog.countDocuments(filter),
    ]);
    const url = baseUrl(req);
    const withUrls = blogs.map((b) => {
      const j = b.toJSON();
      if (j.image && !j.image.startsWith('http')) j.image = `${url}/uploads/${j.image.replace(/^.*[\\/]/, '')}`;
      return j;
    });
    res.json({ blogs: withUrls, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (!blog.published) return res.status(404).json({ message: 'Blog not found' });
    const j = blog.toJSON();
    const url = baseUrl(req);
    if (j.image && !j.image.startsWith('http')) j.image = `${url}/uploads/${j.image.replace(/^.*[\\/]/, '')}`;
    res.json(j);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const body = { ...req.body };
    if (!body.slug) body.slug = body.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '';
    if (body.published === 'true' || body.published === true) body.publishedAt = new Date();
    const blog = await Blog.create(body);
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.published === 'true' || body.published === true) body.publishedAt = body.publishedAt || new Date();
    const blog = await Blog.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
