import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      // Stripe uses the clientSecret THROUGH Elements provider
      // No need to set it here again.
      undefined,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent.status === "succeeded") {
      setMessage("Payment successful! 🎉");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div className="p-3 border rounded">
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Pay"}
      </button>

      {message && <p className="mt-2 text-center text-red-600">{message}</p>}
    </form>
  );
}
