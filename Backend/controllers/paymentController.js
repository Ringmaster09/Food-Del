import razorpay from '../config/razorpay.js';
import crypto from 'crypto';

export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Math.random() * 1000}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Order creation failed", detail: error });
  }
};

export const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true, message: "Payment verified" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
};
