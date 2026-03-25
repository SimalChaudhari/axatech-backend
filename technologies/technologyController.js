import Technology from './Technology.js';

/** Normalize URL or path to relative path under uploads (e.g. TechnologieImages/xxx.png) */
function toRelativeImagePath(p) {
  if (p == null || typeof p !== 'string') return '';
  const normalized = p.replace(/\\/g, '/').trim();
  const match = normalized.match(/\/uploads\/(.+)$/);
  return match ? match[1] : normalized;
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

const baseUrl = (req) => (req ? `${req.protocol}://${req.get('host')}` : '');
/** Ensure technology image is full URL when returning in API */
function withImageUrl(technology, req) {
  if (!technology) return technology;
  const doc = technology.toJSON ? technology.toJSON() : { ...technology };
  if (doc.image && typeof doc.image === 'string' && !doc.image.startsWith('http')) {
    doc.image = `${baseUrl(req)}/uploads/${doc.image.replace(/\\/g, '/')}`;
  }
  return doc;
}

export const getTechnologies = async (req, res) => {
  try {
    const {
      category,
      all,
      status,
      search,
      page,
      limit,
      sortKey = 'sortOrder',
      sortDirection = 'asc',
    } = req.query;

    const includeAll = all === '1' || all === 'true' || all === true;

    // Base filter applied before status filtering (for counts)
    const baseFilter = {};
    if (category) {
      const ids =
        typeof category === 'string'
          ? category.split(',').map((s) => s.trim()).filter(Boolean)
          : [category];
      baseFilter.category = ids.length > 1 ? { $in: ids } : ids[0];
    }

    const normalizedSearch =
      typeof search === 'string' ? search.trim() : '';
    if (
      normalizedSearch &&
      normalizedSearch !== 'undefined' &&
      normalizedSearch !== 'null'
    ) {
      const re = new RegExp(normalizedSearch, 'i');
      baseFilter.$or = [
        { title: re },
        { description: re },
        { category: re },
      ];
    }

    // List filter: apply status or fallback to legacy `all` behaviour.
    const listFilter = { ...baseFilter };
    if (status === 'active') listFilter.isActive = true;
    else if (status === 'inactive') listFilter.isActive = false;
    else if (status === 'all') {
      // no isActive filter
    } else if (!includeAll) {
      // legacy: if `all` is missing => active only
      listFilter.isActive = true;
    }

    const dir = String(sortDirection).toLowerCase() === 'desc' ? -1 : 1;
    const sortFieldMap = {
      title: 'title',
      category: 'category',
      isActive: 'isActive',
      sortOrder: 'sortOrder',
    };
    const sortField = sortFieldMap[sortKey] || 'sortOrder';
    const sortObj = { [sortField]: dir };

    const pageNum = page !== undefined ? Number(page) : undefined;
    const limitNum = limit !== undefined ? Number(limit) : undefined;
    const hasPagination =
      Number.isFinite(pageNum) &&
      Number.isFinite(limitNum) &&
      pageNum > 0 &&
      limitNum > 0;

    // Backward compatibility: if pagination isn't requested, return plain array.
    if (!hasPagination) {
      const technologies = await Technology.find(listFilter).sort('sortOrder title');
      return res.json(technologies.map((t) => withImageUrl(t, req)));
    }

    const [totalAll, totalActive, totalInactive, total] = await Promise.all([
      Technology.countDocuments(baseFilter),
      Technology.countDocuments({ ...baseFilter, isActive: true }),
      Technology.countDocuments({ ...baseFilter, isActive: false }),
      Technology.countDocuments(listFilter),
    ]);

    const skip = (pageNum - 1) * limitNum;
    const technologies = await Technology.find(listFilter)
      .sort(sortObj)
      .skip(Math.max(0, skip))
      .limit(limitNum);

    const withUrls = technologies.map((t) => withImageUrl(t, req));

    res.json({
      technologies: withUrls,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      // backward-compat aliases (some components expect these fields)
      totalPages: Math.ceil(total / limitNum),
      pagination: {
        totalPages: Math.ceil(total / limitNum),
        total,
        page: pageNum,
      },
      counts: {
        all: totalAll,
        active: totalActive,
        inactive: totalInactive,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTechnologyBySlug = async (req, res) => {
  try {
    const technology = await Technology.findOne({
      slug: req.params.slug,
      isActive: true,
    });
    if (!technology)
      return res.status(404).json({ message: 'Technology not found' });
    res.json(withImageUrl(technology, req));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTechnologyById = async (req, res) => {
  try {
    const technology = await Technology.findById(req.params.id);
    if (!technology)
      return res.status(404).json({ message: 'Technology not found' });
    res.json(withImageUrl(technology, req));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTechnology = async (req, res) => {
  try {
    const { title, description, category, image, sortOrder, isActive } =
      req.body;
    if (!title || !description || !category || !image) {
      return res.status(400).json({
        message:
          'Missing required fields: title, description, category, and image are required',
      });
    }
    const categoryEnum = [
      'Frontend Technologies',
      'Backend Technologies',
      'Database Technologies',
    ];
    if (!categoryEnum.includes(category)) {
      return res.status(400).json({
        message: `category must be one of: ${categoryEnum.join(', ')}`,
      });
    }
    let slug = req.body.slug || slugify(title);
    let uniqueSlug = slug;
    let count = 0;
    while (await Technology.exists({ slug: uniqueSlug })) {
      count += 1;
      uniqueSlug = `${slug}-${count}`;
    }
    const imageRel = toRelativeImagePath(image);
    const technology = await Technology.create({
      title,
      description,
      category,
      image: imageRel || image,
      slug: uniqueSlug,
      sortOrder: sortOrder != null ? Number(sortOrder) : 0,
      isActive: isActive !== false,
    });
    res.status(201).json(withImageUrl(technology, req));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTechnology = async (req, res) => {
  try {
    const { title, description, category, image, sortOrder, isActive } =
      req.body;
    const update = {};
    if (title !== undefined) update.title = title;
    if (description !== undefined) update.description = description;
    if (category !== undefined) {
      const categoryEnum = [
        'Frontend Technologies',
        'Backend Technologies',
        'Database Technologies',
      ];
      if (!categoryEnum.includes(category)) {
        return res.status(400).json({
          message: `category must be one of: ${categoryEnum.join(', ')}`,
        });
      }
      update.category = category;
    }
    if (image !== undefined) update.image = toRelativeImagePath(image) || image;
    if (sortOrder !== undefined) update.sortOrder = Number(sortOrder);
    if (isActive !== undefined) update.isActive = isActive;
    const technology = await Technology.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    if (!technology)
      return res.status(404).json({ message: 'Technology not found' });
    res.json(withImageUrl(technology, req));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTechnology = async (req, res) => {
  try {
    const technology = await Technology.findByIdAndDelete(req.params.id);
    if (!technology)
      return res.status(404).json({ message: 'Technology not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
