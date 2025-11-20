import { useState } from "react";
import { useStripe, useElements, CardElement, Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ clientSecret, stripePromise }) {
  // We mount a child Elements here with no options (we use CardElement path)
  return (
    <Elements stripe={stripePromise}>
      <InnerCheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
}

function InnerCheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setMessage("");

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      setMessage(error.message || "Payment failed");
      // Navigate to canceled/failure page after a short delay
      setTimeout(() => navigate("/payment-canceled"), 1200);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment successful! 🎉");
      // Optionally clear checkout localStorage
      localStorage.removeItem("checkout_amount");
      localStorage.removeItem("checkout_bookingId");
      localStorage.removeItem("checkout_userId");
      setTimeout(() => navigate("/payment-success"), 900);
    } else {
      setMessage("Payment status: " + (paymentIntent?.status || "unknown"));
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
        disabled={!stripe || loading || !clientSecret}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Pay"}
      </button>

      {message && <p className="mt-2 text-center text-red-600">{message}</p>}
    </form>
  );
}
