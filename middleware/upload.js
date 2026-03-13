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

if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
  } catch (err) {
    if (process.env.VERCEL !== '1') throw err;
    // On Vercel, /tmp/uploads should succeed; ignore other failures
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
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
