import Category from './Category.js';

export const getCategories = async (req, res) => {
  try {
    const { all, status, search } = req.query;

    const filter = {};
    const includeAll = all === '1' || all === 'true' || all === true;

    if (status === 'active') filter.isActive = true;
    else if (status === 'inactive') filter.isActive = false;
    else if (status === 'all') {
      // no isActive filter
    } else if (!includeAll) {
      // backward compatibility: old behavior returned active only
      filter.isActive = true;
    }

    if (typeof search === 'string' && search.trim()) {
      const q = search.trim();
      const re = new RegExp(q, 'i');
      filter.$or = [{ name: re }, { slug: re }, { description: re }];
    }

    const categories = await Category.find(filter).sort('sortOrder');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    if (!req.body.slug) req.body.slug = req.body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const cat = await Category.create(req.body);
    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
