import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import requireAuth from "../middleware/requireAuth.js";

const cartRouter = express.Router();

cartRouter.post("/add", requireAuth, addToCart);
cartRouter.post("/remove", requireAuth, removeFromCart);
cartRouter.get("/", requireAuth, getCart); // GET method for cart retrieval is more RESTful

export default cartRouter;
