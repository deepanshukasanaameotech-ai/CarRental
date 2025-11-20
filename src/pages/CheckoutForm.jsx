import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Use current origin so this works in prod/dev
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) setMessage(error.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow-md rounded-lg">

      <PaymentElement />

      <button
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
      >
        {loading ? "Processing…" : "Pay Now"}
      </button>

      {message && <p className="text-red-500 mt-2">{message}</p>}
    </form>
  );
}
