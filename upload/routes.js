import express from 'express';
import { upload, uploadProjectImage } from '../middleware/upload.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Existing upload endpoint for products (images/videos)
router.post('/', protect, admin, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const subDir = req.file.mimetype.startsWith('image/') ? 'productimages' : 'productvideos';
  const filenameWithDir = `${subDir}/${req.file.filename}`;
  const url = `${req.protocol}://${req.get('host')}/uploads/${filenameWithDir}`;
  res.json({ url, filename: filenameWithDir });
});

// New endpoint for project images only
router.post('/project-image', protect, admin, uploadProjectImage.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const subDir = 'projectimages';
  const filenameWithDir = `${subDir}/${req.file.filename}`;
  const url = `${req.protocol}://${req.get('host')}/uploads/${filenameWithDir}`;
  res.json({ url, filename: filenameWithDir });
});

export default router;
