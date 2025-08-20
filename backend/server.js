import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// ✅ Explicit CORS setup (works locally + on Vercel)
app.use(
  cors({
    origin: [
      'http://localhost:3000',              
      // local React
      'https://e-commerce-one-lemon-70.vercel.app' 
      // replace with your Vercel URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error(err));

// Serve static images folder
const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, '/public/images')));

// API routes
app.use('/api/products', productRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
