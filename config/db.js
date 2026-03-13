import mongoose from 'mongoose';

/**
 * Connect to MongoDB. Idempotent: if already connected, returns immediately.
 * Required on Vercel: await this before handling requests so operations don't buffer and time out.
 */
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return; // already connected

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MongoDB connection error: MONGODB_URI is not set (add it in Vercel Environment Variables)');
    if (process.env.VERCEL === '1') return;
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      maxPoolSize: 10,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (process.env.VERCEL === '1') return;
    process.exit(1);
  }
};

export default connectDB;
