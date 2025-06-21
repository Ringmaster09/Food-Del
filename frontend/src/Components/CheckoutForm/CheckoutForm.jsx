import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";

const CheckoutForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe not loaded yet.");
      return;
    }

    // MOCK: Call backend to get clientSecret here (skipped for now)
    console.log("Proceeding to payment...");
    onSuccess();
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe} className="payment-btn">
        Proceed to Payment
      </button>
    </form>
  );
};

export default CheckoutForm;