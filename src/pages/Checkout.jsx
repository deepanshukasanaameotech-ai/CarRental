import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { BASE_URL } from "../api";

const stripePromise = loadStripe(
  "pk_test_51RY4AxPVTaanfxbkmRzdavqDMZQ4V3MhHaTSeIpTJ7GtoM9UNAn3a6y3oj6wsvVreqNYw3xLJTrMANCJnMlx9UGr00J8qWGL7f"
);

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function init() {
      try {
        const bookingId = localStorage.getItem("checkout_bookingId");
        const rawAmount = localStorage.getItem("checkout_amount");

        if (!bookingId) {
          setError("No booking selected for checkout. Please try again from bookings.");
          setLoading(false);
          return;
        }

        const numeric = Number(rawAmount || 0);
        if (Number.isNaN(numeric) || numeric <= 0) {
          setError("Invalid checkout amount. Please try again.");
          setLoading(false);
          return;
        }

        const amountInSmallest = Math.round(numeric * 100);

        const res = await fetch(`${BASE_URL}/payments/create-intent/${bookingId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amountInSmallest }),
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Payment intent creation failed: ${res.status} ${txt}`);
        }

        const data = await res.json();
        setClientSecret(data.clientSecret || data.client_secret || "");
      } catch (err) {
        setError(err.message || "Failed to initialize payment");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {loading ? (
          <p>Initializing payment…</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : clientSecret ? (
          <CheckoutForm clientSecret={clientSecret} stripePromise={stripePromise} />
        ) : (
          <p className="text-red-600">Could not get payment details.</p>
        )}
      </div>
    </div>
  );
}
