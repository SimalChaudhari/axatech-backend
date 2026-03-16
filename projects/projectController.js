import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import Project from './Project.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = process.env.UPLOAD_PATH || path.join(__dirname, '..', 'uploads');

// Normalize stored path or URL to relative path under uploads (e.g. projectimages/xxx.png)
function toRelativePath(p) {
  if (p == null || typeof p !== 'string') return '';
  const normalized = p.replace(/\\/g, '/').trim();
  const match = normalized.match(/\/uploads\/(.+)$/);
  return match ? match[1] : normalized;
}

// Resolve relative path to absolute file path
function toAbsolutePath(relativePath) {
  if (!relativePath) return null;
  return path.join(uploadDir, relativePath.replace(/\\/g, '/'));
}

// Delete file from uploads if it exists; ignore errors
async function deleteUploadFile(relativePath) {
  if (!relativePath || !relativePath.startsWith('projectimages/')) return;
  const absolute = toAbsolutePath(relativePath);
  try {
    await fs.unlink(absolute);
  } catch {
    // File may already be missing
  }
}

const baseUrl = (req) => (req ? `${req.protocol}://${req.get('host')}` : '');

/** Generate slug from title: lowercase, trim, spaces to hyphens, only [a-z0-9-] */
function slugFromTitle(title) {
  if (title == null || typeof title !== 'string') return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

const addImageUrl = (item, req) => {
  if (!item) return item;
  const url = baseUrl(req);
  const toJson = item.toJSON ? item.toJSON() : { ...item };

  if (typeof toJson.image === 'string' && toJson.image) {
    const rel = toRelativePath(toJson.image);
    toJson.image = rel.startsWith('http') ? rel : `${url}/uploads/${rel.replace(/\\/g, '/')}`;
  }

  return toJson;
};

export const getProjects = async (req, res) => {
  try {
    const { category, all } = req.query;
    const filter = {};
    if (!all) filter.isActive = true;
    if (category) filter.category = category;

    const projects = await Project.find(filter).sort('sortOrder');
    const withUrls = projects.map((p) => addImageUrl(p, req));
    res.json(withUrls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, isActive: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(addImageUrl(project, req));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.title) body.slug = slugFromTitle(body.slug || body.title);
    const project = await Project.create(body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const current = await Project.findById(req.params.id);
    if (!current) return res.status(404).json({ message: 'Project not found' });

    const body = { ...req.body };
    if (body.title != null) body.slug = slugFromTitle(body.slug || body.title);

    const oldImage = toRelativePath(current.image);
    const newImage = toRelativePath(body.image);

    if (oldImage && oldImage.startsWith('projectimages/') && oldImage !== newImage) {
      await deleteUploadFile(oldImage);
    }

    const project = await Project.findByIdAndUpdate(req.params.id, body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const image = toRelativePath(project.image);
    if (image && image.startsWith('projectimages/')) {
      await deleteUploadFile(image);
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete multiple projects by IDs. Body: { ids: string[] }
export const deleteProjectsBulk = async (req, res) => {
  try {
    const ids = Array.isArray(req.body?.ids) ? req.body.ids.filter((id) => id != null && String(id).trim()) : [];
    if (ids.length === 0) return res.status(400).json({ message: 'ids array is required' });

    const projects = await Project.find({ _id: { $in: ids } });
    for (const project of projects) {
      const image = toRelativePath(project.image);
      if (image && image.startsWith('projectimages/')) {
        await deleteUploadFile(image);
      }
    }

    const result = await Project.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Deleted', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

