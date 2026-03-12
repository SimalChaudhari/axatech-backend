import Product from '../models/Product.js';

const baseUrl = (req) => req ? `${req.protocol}://${req.get('host')}` : '';

const addImageUrl = (item, req) => {
  if (!item) return item;
  const url = baseUrl(req);
  const toJson = item.toJSON ? item.toJSON() : { ...item };
  if (toJson.image && !toJson.image.startsWith('http')) toJson.image = `${url}/uploads/${toJson.image.replace(/^.*[\\/]/, '')}`;
  if (toJson.images?.length) toJson.images = toJson.images.map((i) => (i.startsWith('http') ? i : `${url}/uploads/${i.replace(/^.*[\\/]/, '')}`));
  return toJson;
};

export const getProducts = async (req, res) => {
  try {
    const { category, featured, search, page = 1, limit = 12, all } = req.query;
    const filter = {};
    if (!all) filter.isActive = true;
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (search) {
      const re = new RegExp(search, 'i');
      filter.$or = [
        { name: re },
        { description: re },
        { shortDescription: re },
      ];
    }
    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find(filter).populate('category').sort('sortOrder').skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);
    const withUrls = products.map((p) => addImageUrl(p, req));
    res.json({ products: withUrls, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true }).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(addImageUrl(product, req));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const body = { ...req.body };
    if (!body.slug) body.slug = body.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '';
    if (body.category === '') delete body.category;
    const product = await Product.create(body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.category === '') delete body.category;
    const product = await Product.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
