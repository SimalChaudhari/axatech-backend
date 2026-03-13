import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MongoDB connection error: MONGODB_URI is not set (add it in Vercel Environment Variables)');
    if (process.env.VERCEL === '1') return; // Don't exit on Vercel so logs are visible
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (process.env.VERCEL === '1') return; // Don't exit on Vercel; function can retry on next request
    process.exit(1);
  }
};

export default connectDB;
