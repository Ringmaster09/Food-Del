import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("your_stripe_public_key_here");

const StripeContext = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeContext;
