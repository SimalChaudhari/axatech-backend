import LicensePlan from './LicensePlan.js';

export const getPlans = async (req, res) => {
  try {
    const {
      type,
      all,
      status,
      page,
      limit,
      search,
      sortKey = 'sortOrder',
      sortDirection = 'asc',
    } = req.query;

    const pageNum = page !== undefined ? Number(page) : undefined;
    const limitNum = limit !== undefined ? Number(limit) : undefined;
    const hasPagination = Number.isFinite(pageNum) && Number.isFinite(limitNum);

    const includeAll = all === '1' || all === 'true' || all === true;

    // Base search (used for meta counts/types and for the main list)
    const searchFilter = {};
    if (typeof search === 'string' && search.trim()) {
      searchFilter.planName = new RegExp(search.trim(), 'i');
    }

    // Meta counts/types ignore type + status (so tabs/dropdowns remain consistent across filters)
    const metaFilter = { ...searchFilter };
    const [totalAll, activeCount, inactiveCount, distinctTypes] = await Promise.all([
      LicensePlan.countDocuments(metaFilter),
      LicensePlan.countDocuments({ ...metaFilter, isActive: true }),
      LicensePlan.countDocuments({ ...metaFilter, isActive: false }),
      LicensePlan.distinct('type', metaFilter),
    ]);

    const filter = { ...searchFilter };
    if (type) filter.type = type;

    // Status filtering
    if (status === 'active') {
      filter.isActive = true;
    } else if (status === 'inactive') {
      filter.isActive = false;
    } else if (status === 'all') {
      // include both active and inactive
    } else if (!includeAll) {
      // Backward compatibility with old `all` query param:
      // - when `all` is missing => active only
      filter.isActive = true;
    }

    // Sorting
    const dir = String(sortDirection).toLowerCase() === 'desc' ? -1 : 1;
    const sortFieldMap = {
      planName: 'planName',
      type: 'type',
      price: 'price',
      isActive: 'isActive',
      sortOrder: 'sortOrder',
    };
    const sortField = sortFieldMap[sortKey] || 'sortOrder';
    const sortObj = { [sortField]: dir };

    if (!hasPagination) {
      const plans = await LicensePlan.find(filter).sort(sortObj).sort('sortOrder');
      return res.json(plans);
    }

    const total = await LicensePlan.countDocuments(filter);
    const skip = (pageNum - 1) * limitNum;
    const plans = await LicensePlan.find(filter)
      .sort(sortObj)
      .skip(Math.max(0, skip))
      .limit(Math.max(1, limitNum));

    res.json({
      plans,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      counts: { all: totalAll, active: activeCount, inactive: inactiveCount },
      types: distinctTypes,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPlan = async (req, res) => {
  try {
    const plan = await LicensePlan.create(req.body);
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const plan = await LicensePlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const plan = await LicensePlan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
