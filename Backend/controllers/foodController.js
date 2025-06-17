import foodModel from "../models/foodModel.js";

export const addFood = async (req, res) => {
  try {
    console.log("🟢 Incoming POST /api/food/add");
    console.log("📦 req.body:", req.body);
    console.log("🖼️ req.file:", req.file);

    // Validate input
    const { description, category } = req.body;
    const price = Number(req.body.price);
    const image_filename = req.file?.filename;

    if (!description || !price || !category || !image_filename) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (description, price, category, image)",
      });
    }

    // Create and save food item
    const food = new foodModel({
      description,
      price,
      category,
      image: image_filename,
    });

    await food.save();

    console.log("✅ Food saved:", food);
    res.status(201).json({ success: true, message: "Food Added", food });
  } catch (error) {
    console.error("❌ Error in addFood:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
