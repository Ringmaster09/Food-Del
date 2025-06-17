import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { addFood, listFoods } from '../controllers/foodController.js';

const foodRouter = express.Router();

// Ensure uploads folder exists
const uploadDir = path.resolve('uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Routes
foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/', listFoods);

export default foodRouter;
