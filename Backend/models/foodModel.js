import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Food', foodSchema);
