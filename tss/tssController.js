import TssPlan from './TssPlan.js';

export const getTssPlans = async (req, res) => {
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

    const searchFilter = {};
    if (typeof search === 'string' && search.trim()) {
      searchFilter.title = new RegExp(search.trim(), 'i');
    }

    const metaFilter = { ...searchFilter };
    const [totalAll, activeCount, inactiveCount, distinctTypes] = await Promise.all([
      TssPlan.countDocuments(metaFilter),
      TssPlan.countDocuments({ ...metaFilter, isActive: true }),
      TssPlan.countDocuments({ ...metaFilter, isActive: false }),
      TssPlan.distinct('type', metaFilter),
    ]);

    const filter = { ...searchFilter };
    if (type) filter.type = type;

    if (status === 'active') {
      filter.isActive = true;
    } else if (status === 'inactive') {
      filter.isActive = false;
    } else if (status === 'all') {
      // include both
    } else if (!includeAll) {
      filter.isActive = true;
    }

    const dir = String(sortDirection).toLowerCase() === 'desc' ? -1 : 1;
    const sortFieldMap = {
      title: 'title',
      type: 'type',
      price: 'price',
      isActive: 'isActive',
      sortOrder: 'sortOrder',
    };
    const sortField = sortFieldMap[sortKey] || 'sortOrder';
    const sortObj = { [sortField]: dir };

    if (!hasPagination) {
      const items = await TssPlan.find(filter).sort(sortObj).sort('sortOrder');
      return res.json(items);
    }

    const total = await TssPlan.countDocuments(filter);
    const skip = (pageNum - 1) * limitNum;
    const items = await TssPlan.find(filter)
      .sort(sortObj)
      .skip(Math.max(0, skip))
      .limit(Math.max(1, limitNum));

    res.json({
      items,
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

export const createTssPlan = async (req, res) => {
  try {
    const item = await TssPlan.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTssPlan = async (req, res) => {
  try {
    const item = await TssPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'TSS plan not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTssPlan = async (req, res) => {
  try {
    const item = await TssPlan.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'TSS plan not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

