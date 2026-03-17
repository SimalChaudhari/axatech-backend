import express from 'express';
import { upload, uploadProjectImage, uploadTechnologieImage } from '../middleware/upload.js';
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

// Technology images stored in uploads/TechnologieImages
router.post('/technology-image', protect, admin, uploadTechnologieImage.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const subDir = 'TechnologieImages';
  const filenameWithDir = `${subDir}/${req.file.filename}`;
  const url = `${req.protocol}://${req.get('host')}/uploads/${filenameWithDir}`;
  res.json({ url, filename: filenameWithDir });
});

export default router;
