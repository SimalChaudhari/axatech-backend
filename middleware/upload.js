import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// On Vercel the project dir is read-only; use /tmp so the function doesn't crash
const uploadDir =
  process.env.VERCEL === '1'
    ? path.join('/tmp', 'uploads')
    : (process.env.UPLOAD_PATH || path.join(__dirname, '..', 'uploads'));

const productImagesDir = path.join(uploadDir, 'productimages');
const productVideosDir = path.join(uploadDir, 'productvideos');
const projectImagesDir = path.join(uploadDir, 'projectimages');
const technologieImagesDir = path.join(uploadDir, 'TechnologieImages');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (err) {
      if (process.env.VERCEL !== '1') throw err;
    }
  }
}
ensureDir(uploadDir);
ensureDir(productImagesDir);
ensureDir(productVideosDir);
ensureDir(projectImagesDir);
ensureDir(technologieImagesDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subDir = file.mimetype.startsWith('image/') ? productImagesDir : productVideosDir;
    cb(null, subDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const projectImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, projectImagesDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const technologieImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, technologieImagesDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /image\/|video\//;
  if (allowed.test(file.mimetype)) cb(null, true);
  else cb(new Error('Only images and videos allowed'), false);
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
export const uploadProjectImage = multer({
  storage: projectImageStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});
export const uploadTechnologieImage = multer({
  storage: technologieImageStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});
