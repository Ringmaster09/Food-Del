import foodModel from '../models/foodModel.js';

// Add new food
export const addFood = async (req, res) => {
  try {
    const { description, category } = req.body;
    const price = Number(req.body.price);
    const image = req.file?.filename;

    if (!description || !price || !category || !image) {
      return res.status(400).json({
        success: false,
        message: 'All fields (description, price, category, image) are required',
      });
    }

    const food = new foodModel({ description, price, category, image });
    await food.save();

    res.status(201).json({
      success: true,
      message: 'Food added successfully',
      food,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all foods
export const listFoods = async (req, res) => {
  try {
    const foods = await foodModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
