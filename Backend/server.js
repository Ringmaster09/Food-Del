import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import foodRouter from './routes/foodRoute.js';

dotenv.config(); // Load .env first

const app = express();

// 👇 Middleware to parse JSON body
app.use(express.json());

// Connect to MongoDB
connectDB();

// 👇 Use your routes AFTER body parsing middleware
app.use("/api/food", foodRouter);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Server Started on http://localhost:${PORT}`);
});
