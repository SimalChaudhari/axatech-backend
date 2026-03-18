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
    const { status, type, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    const skip = (Number(page) - 1) * Number(limit);
    const [enquiries, total] = await Promise.all([
      Enquiry.find(filter).populate('products service licensePlan cloudPlan').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Enquiry.countDocuments(filter),
    ]);
    res.json({ enquiries, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
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
