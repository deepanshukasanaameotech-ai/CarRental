import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { BASE_URL } from "../api";

// Your publishable key (keep or move to env as desired)
const stripePromise = loadStripe(
  "pk_test_51RY4AxPVTaanfxbkmRzdavqDMZQ4V3MhHaTSeIpTJ7GtoM9UNAn3a6y3oj6wsvVreqNYw3xLJTrMANCJnMlx9UGr00J8qWGL7f"
);

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function createPaymentIntent() {
      try {
        const rawAmount = localStorage.getItem("checkout_amount");
        if (!rawAmount) {
          setError("No checkout amount found. Please start booking again.");
          setLoading(false);
          return;
        }

        // Convert to number and to smallest currency unit (cents)
        const numeric = Number(rawAmount);
        if (Number.isNaN(numeric) || numeric <= 0) {
          setError("Invalid checkout amount.");
          setLoading(false);
          return;
        }

        const amountInCents = Math.round(numeric * 100);

        const res = await fetch(`${BASE_URL}/api/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amountInCents }),
        });

        if (!res.ok) {
          const body = await res.text();
          throw new Error(`PaymentIntent creation failed: ${res.status} ${body}`);
        }

        const data = await res.json();
        setClientSecret(data.clientSecret || data.client_secret || "");
      } catch (err) {
        setError(err.message || "Failed to create payment intent.");
      } finally {
        setLoading(false);
      }
    }

    createPaymentIntent();
  }, []);

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {loading ? (
          <p>Loading Payment…</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        ) : (
          <p className="text-red-600">Unable to initialize payment.</p>
        )}
      </div>
    </div>
  );
}
