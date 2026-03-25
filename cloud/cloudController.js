import CloudPlan from './CloudPlan.js';

export const getCloudPlans = async (req, res) => {
  try {
    const {
      type,
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
    if (type) baseFilter.type = type;

    const normalizedSearch =
      typeof search === 'string' ? search.trim() : '';
    if (
      normalizedSearch &&
      normalizedSearch !== 'undefined' &&
      normalizedSearch !== 'null'
    ) {
      const re = new RegExp(normalizedSearch, 'i');
      baseFilter.$or = [
        { planName: re },
        { type: re },
        { period: re },
        { description: re },
        { features: re },
      ];
    }

    const listFilter = { ...baseFilter };
    if (status === 'active') listFilter.isActive = true;
    else if (status === 'inactive') listFilter.isActive = false;
    else if (status === 'all') {
      // no isActive filter
    } else if (!includeAll) {
      // legacy behavior: no `all` => active only
      listFilter.isActive = true;
    }

    const dir = String(sortDirection).toLowerCase() === 'desc' ? -1 : 1;
    const sortFieldMap = {
      planName: 'planName',
      type: 'type',
      price: 'price',
      period: 'period',
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
      const plans = await CloudPlan.find(listFilter).sort(sortObj);
      return res.json(plans);
    }

    const [totalAll, totalActive, totalInactive, total] = await Promise.all([
      CloudPlan.countDocuments(baseFilter),
      CloudPlan.countDocuments({ ...baseFilter, isActive: true }),
      CloudPlan.countDocuments({ ...baseFilter, isActive: false }),
      CloudPlan.countDocuments(listFilter),
    ]);

    const skip = (pageNum - 1) * limitNum;
    const plans = await CloudPlan.find(listFilter)
      .sort(sortObj)
      .skip(Math.max(0, skip))
      .limit(limitNum);

    res.json({
      plans,
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

export const createCloudPlan = async (req, res) => {
  try {
    const plan = await CloudPlan.create(req.body);
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCloudPlan = async (req, res) => {
  try {
    const plan = await CloudPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCloudPlan = async (req, res) => {
  try {
    const plan = await CloudPlan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
