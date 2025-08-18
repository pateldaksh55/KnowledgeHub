import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1234;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB — UPDATED to avoid deprecated options
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use('/api/auth', authRoutes);

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// ✅ Serve frontend React app from dist
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(distPath));

// ✅ React router fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
