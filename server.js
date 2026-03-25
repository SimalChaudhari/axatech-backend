import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import connectDB from './config/db.js';
import authRoutes from './auth/routes.js';
import homeRoutes from './home/routes.js';
import licenseRoutes from './licenses/routes.js';
import categoryRoutes from './categories/routes.js';
import productRoutes from './products/routes.js';
import serviceRoutes from './services/routes.js';
import cloudRoutes from './cloud/routes.js';
import enquiryRoutes from './enquiries/routes.js';
import blogRoutes from './blog/routes.js';
import uploadRoutes from './upload/routes.js';
import projectRoutes from './projects/routes.js';
import technologyRoutes from './technologies/routes.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Start connection in background when running locally
if (process.env.VERCEL !== '1') connectDB();

const app = express();
app.use(express.json());

// Ensure DB is connected before any API handler (fixes Vercel cold start / buffering timeout)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});
// Strip trailing slash so CORS origin matches browser (e.g. https://axatech-frontend.vercel.app)
const corsOrigin = process.env.CLIENT_URL?.replace(/\/$/, '') || '*';
app.use(cors({ origin: corsOrigin, credentials: true }));
const uploadsDir = path.join(__dirname, process.env.UPLOAD_PATH || 'uploads');
if (existsSync(uploadsDir)) {
  app.use('/uploads', express.static(uploadsDir));
}

app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/licenses', licenseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/cloud', cloudRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/technologies', technologyRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Root and favicon so GET / and /favicon.ico don't 404
app.get('/', (req, res) => res.json({ message: 'API running', health: '/api/health' }));
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Catch unhandled errors so the serverless function doesn't crash
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: err?.message || 'Internal Server Error' });
});

// Export for Vercel serverless; listen locally when not on Vercel
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Vercel invokes this as the serverless handler
export default app;