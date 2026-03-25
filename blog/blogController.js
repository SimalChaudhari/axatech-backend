import Blog from './Blog.js';

const baseUrl = (req) => req ? `${req.protocol}://${req.get('host')}` : '';

export const getBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      all,
      status,
      search,
      sortKey = 'publishedAt',
      sortDirection = 'desc',
    } = req.query;

    const includeAll = all === '1' || all === 'true' || all === true;

    const normalizedSearch = typeof search === 'string' ? search.trim() : '';
    const hasSearch =
      normalizedSearch &&
      normalizedSearch !== 'undefined' &&
      normalizedSearch !== 'null';

    // Base filter: apply legacy/public published-only when `all` is not provided.
    const baseFilter = {};
    if (!includeAll) baseFilter.published = true;

    if (hasSearch) {
      const re = new RegExp(normalizedSearch, 'i');
      baseFilter.$or = [
        { title: re },
        { author: re },
        { slug: re },
        { excerpt: re },
        { content: re },
      ];
    }

    // List filter: apply selected status tab on top of baseFilter.
    const listFilter = { ...baseFilter };
    if (status && status !== 'all') {
      if (status === 'published') listFilter.published = true;
      if (status === 'draft') listFilter.published = false;
    }

    const pageNum = Number(page) > 0 ? Number(page) : 1;
    const limitNum = Number(limit) > 0 ? Number(limit) : 10;
    const skip = (pageNum - 1) * limitNum;

    const dir = String(sortDirection).toLowerCase() === 'asc' ? 1 : -1;
    const sortFieldMap = {
      title: 'title',
      published: 'published',
      publishedAt: 'publishedAt',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    };
    const sortField = sortFieldMap[sortKey] || sortFieldMap.publishedAt;

    const [blogs, total, totalAll, totalPublished, totalDraft] = await Promise.all([
      Blog.find(listFilter)
        .sort({ [sortField]: dir })
        .skip(skip)
        .limit(limitNum),
      Blog.countDocuments(listFilter),
      Blog.countDocuments(baseFilter),
      Blog.countDocuments({ ...baseFilter, published: true }),
      Blog.countDocuments({ ...baseFilter, published: false }),
    ]);

    const url = baseUrl(req);
    const withUrls = blogs.map((b) => {
      const j = b.toJSON();
      if (j.image && !j.image.startsWith('http')) {
        j.image = `${url}/uploads/${j.image.replace(/^.*[\\/]/, '')}`;
      }
      return j;
    });

    res.json({
      blogs: withUrls,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum) || 0,
      totalPages: Math.ceil(total / limitNum) || 0,
      pagination: {
        totalPages: Math.ceil(total / limitNum) || 0,
        total,
        page: pageNum,
      },
      counts: {
        all: totalAll,
        published: totalPublished,
        draft: totalDraft,
      },
    });
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
