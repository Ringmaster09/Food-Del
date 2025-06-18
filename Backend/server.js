import express from 'express';
import cors from 'cors'; // <-- ✅ import CORS
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';

dotenv.config();
const app = express();

// ✅ Enable CORS middleware (allow all origins or restrict as needed)
app.use(cors({
  origin: 'http://localhost:5173', // 👈 specify your React app's URL
  credentials: true,               // 👈 optional: if you use cookies/auth
}));

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
