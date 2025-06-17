import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';

dotenv.config();
const app = express();

// MongoDB Connection
connectDB();

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/food', foodRouter);

app.get('/', (req, res) => {
  res.send('🍽️ Food Delivery API running...');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
