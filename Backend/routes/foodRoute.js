import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { addFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

// Ensure 'uploads' folder exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
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

// Route: POST /api/food/add
foodRouter.post("/add", upload.single("image"), addFood);

export default foodRouter;
