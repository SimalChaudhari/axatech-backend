import Service from './Service.js';

export const getServices = async (req, res) => {
  try {
    const {
      all,
      status,
      search,
      page,
      limit,
      sortKey = 'sortOrder',
      sortDirection = 'asc',
    } = req.query;

    const includeAll = all === '1' || all === 'true' || all === true;

    const baseFilter = {};

    const normalizedSearch = typeof search === 'string' ? search.trim() : '';
    if (normalizedSearch && normalizedSearch !== 'undefined' && normalizedSearch !== 'null') {
      const re = new RegExp(normalizedSearch, 'i');
      baseFilter.$or = [
        { title: re },
        { slug: re },
        { shortDescription: re },
        { description: re },
      ];
    }

    // Apply status filter
    const listFilter = { ...baseFilter };
    if (status === 'active') listFilter.isActive = true;
    else if (status === 'inactive') listFilter.isActive = false;
    else if (status === 'all') {
      // no isActive filter
    } else if (!includeAll) {
      // legacy behavior
      listFilter.isActive = true;
    }

    // Sorting
    const dir = String(sortDirection).toLowerCase() === 'desc' ? -1 : 1;
    const sortFieldMap = {
      title: 'title',
      slug: 'slug',
      shortDescription: 'shortDescription',
      description: 'description',
      isActive: 'isActive',
      sortOrder: 'sortOrder',
    };
    const sortField = sortFieldMap[sortKey] || 'sortOrder';
    const sortObj = { [sortField]: dir };

    const pageNum = page !== undefined ? Number(page) : undefined;
    const limitNum = limit !== undefined ? Number(limit) : undefined;
    const hasPagination =
      Number.isFinite(pageNum) && Number.isFinite(limitNum) && pageNum > 0 && limitNum > 0;

    if (!hasPagination) {
      const services = await Service.find(listFilter).sort(sortObj).sort('sortOrder');
      return res.json(services);
    }

    const [totalAll, totalActive, totalInactive, total] = await Promise.all([
      Service.countDocuments(baseFilter),
      Service.countDocuments({ ...baseFilter, isActive: true }),
      Service.countDocuments({ ...baseFilter, isActive: false }),
      Service.countDocuments(listFilter),
    ]);

    const skip = (pageNum - 1) * limitNum;
    const services = await Service.find(listFilter)
      .sort(sortObj)
      .skip(Math.max(0, skip))
      .limit(limitNum);

    res.json({
      services,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      // backward-compat aliases
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

export const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createService = async (req, res) => {
  try {
    if (!req.body.slug) req.body.slug = req.body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
