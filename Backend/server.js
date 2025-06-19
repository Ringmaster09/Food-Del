import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
connectDB();

app.use('/uploads', express.static('uploads'));

// ✅ API Routes
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);

// Root Route
app.get('/', (req, res) => {
  res.send('🍽️ Food Delivery API running...');
});

app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found", path: req.originalUrl });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
