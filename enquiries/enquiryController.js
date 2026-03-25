import Enquiry from './Enquiry.js';

export const createEnquiry = async (req, res) => {
  try {
    const body = { ...req.body };
    // Backward/forward compatibility:
    // - UI may send `productIds` (array) for multi-product enquiry from the products page.
    // - Schema stores it as `products` (array of ObjectIds).
    if (!body.products && body.productIds !== undefined) {
      if (Array.isArray(body.productIds)) body.products = body.productIds;
      else if (typeof body.productIds === 'string') {
        body.products = body.productIds
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      } else {
        body.products = [body.productIds];
      }
    }
    // Backward compatibility: older UI may send a single `product`.
    if (body.product && !body.products) body.products = [body.product];
    delete body.productIds;
    delete body.product;
    const enquiry = await Enquiry.create(body);
    res.status(201).json({ message: 'Enquiry submitted successfully', id: enquiry._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    const {
      status,
      type,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    const pageNum = Number(page) > 0 ? Number(page) : 1;
    const limitNum = Number(limit) > 0 ? Number(limit) : 20;
    const skip = (pageNum - 1) * limitNum;

    const normalizedSearch = typeof search === 'string' ? search.trim() : '';
    const hasSearch =
      normalizedSearch &&
      normalizedSearch !== 'undefined' &&
      normalizedSearch !== 'null';

    const statusFilter =
      status && status !== 'all' && status !== '' ? status : null;

    const baseFilter = {};
    if (type) baseFilter.type = type;
    if (hasSearch) {
      const re = new RegExp(normalizedSearch, 'i');
      baseFilter.$or = [
        { name: re },
        { email: re },
        { type: re },
        { company: re },
        { message: re },
      ];
    }

    const listFilter = { ...baseFilter };
    if (statusFilter) listFilter.status = statusFilter;

    const [enquiries, total, totalAll, totalNew, totalContacted, totalClosed] =
      await Promise.all([
        Enquiry.find(listFilter)
          .populate('products service licensePlan cloudPlan')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNum),
        Enquiry.countDocuments(listFilter),
        Enquiry.countDocuments(baseFilter),
        Enquiry.countDocuments({ ...baseFilter, status: 'New' }),
        Enquiry.countDocuments({ ...baseFilter, status: 'Contacted' }),
        Enquiry.countDocuments({ ...baseFilter, status: 'Closed' }),
      ]);

    const pages = Math.ceil(total / limitNum) || 0;

    res.json({
      enquiries,
      total,
      page: pageNum,
      pages,
      totalPages: pages,
      pagination: {
        totalPages: pages,
        total,
        page: pageNum,
      },
      counts: {
        all: totalAll,
        New: totalNew,
        Contacted: totalContacted,
        Closed: totalClosed,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id).populate('products service licensePlan cloudPlan');
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const update = {};
    if (status) update.status = status;
    if (adminNotes !== undefined) update.adminNotes = adminNotes;
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
