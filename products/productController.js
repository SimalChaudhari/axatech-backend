import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import Product from './Product.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = process.env.UPLOAD_PATH || path.join(__dirname, '..', 'uploads');

/** Normalize stored path or URL to relative path under uploads (e.g. productimages/xxx.png) */
function toRelativePath(p) {
  if (p == null || typeof p !== 'string') return '';
  const normalized = p.replace(/\\/g, '/').trim();
  const match = normalized.match(/\/uploads\/(.+)$/);
  return match ? match[1] : normalized;
}

/** Resolve relative path to absolute file path */
function toAbsolutePath(relativePath) {
  if (!relativePath) return null;
  return path.join(uploadDir, relativePath.replace(/\\/g, '/'));
}

/** Delete file from uploads if it exists; ignore errors (e.g. already deleted) */
async function deleteUploadFile(relativePath) {
  if (!relativePath || !relativePath.startsWith('productimages/') && !relativePath.startsWith('productvideos/')) return;
  const absolute = toAbsolutePath(relativePath);
  try {
    await fs.unlink(absolute);
  } catch {
    // File may already be missing
  }
}

const baseUrl = (req) => req ? `${req.protocol}://${req.get('host')}` : '';

const addImageUrl = (item, req) => {
  if (!item) return item;
  const url = baseUrl(req);
  const toJson = item.toJSON ? item.toJSON() : { ...item };
  const toUploadUrl = (p) => {
    if (p == null || typeof p !== 'string') return p;
    return p.startsWith('http') ? p : `${url}/uploads/${p.replace(/\\/g, '/')}`;
  };
  if (Array.isArray(toJson.images)) toJson.images = toJson.images.map((p) => (typeof p === 'string' ? toUploadUrl(p) : p));
  if (typeof toJson.demoVideoLink === 'string') toJson.demoVideoLink = toUploadUrl(toJson.demoVideoLink);
  return toJson;
};

export const getProducts = async (req, res) => {
  try {
    const { category, featured, search, page = 1, limit = 12, all } = req.query;
    const filter = {};
    if (!all) filter.isActive = true;
    if (category) {
      const ids = typeof category === 'string' ? category.split(',').map((s) => s.trim()).filter(Boolean) : [category];
      filter.category = ids.length > 1 ? { $in: ids } : ids[0];
    }
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
    const current = await Product.findById(req.params.id);
    if (!current) return res.status(404).json({ message: 'Product not found' });

    const body = { ...req.body };
    if (body.category === '') delete body.category;

    const newImages = (body.images || []).map(toRelativePath).filter(Boolean);
    const oldImages = (current.images || []).map(toRelativePath).filter(Boolean);
    const toRemoveImages = oldImages.filter((p) => !newImages.includes(p));
    for (const p of toRemoveImages) await deleteUploadFile(p);

    const oldVideo = toRelativePath(current.demoVideoLink);
    const newVideo = toRelativePath(body.demoVideoLink);
    if (oldVideo && oldVideo.startsWith('productvideos/') && oldVideo !== newVideo) {
      await deleteUploadFile(oldVideo);
    }

    const product = await Product.findByIdAndUpdate(req.params.id, body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const images = (product.images || []).map(toRelativePath).filter(Boolean);
    for (const p of images) await deleteUploadFile(p);

    const video = toRelativePath(product.demoVideoLink);
    if (video && video.startsWith('productvideos/')) await deleteUploadFile(video);

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** Delete multiple products by IDs. Body: { ids: string[] } */
export const deleteProductsBulk = async (req, res) => {
  try {
    const ids = Array.isArray(req.body?.ids) ? req.body.ids.filter((id) => id != null && String(id).trim()) : [];
    if (ids.length === 0) return res.status(400).json({ message: 'ids array is required' });

    const products = await Product.find({ _id: { $in: ids } });
    for (const product of products) {
      const images = (product.images || []).map(toRelativePath).filter(Boolean);
      for (const p of images) await deleteUploadFile(p);
      const video = toRelativePath(product.demoVideoLink);
      if (video && video.startsWith('productvideos/')) await deleteUploadFile(video);
    }
    const result = await Product.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Deleted', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
