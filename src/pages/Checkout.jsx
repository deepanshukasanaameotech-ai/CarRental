import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51RY4AxPVTaanfxbkmRzdavqDMZQ4V3MhHaTSeIpTJ7GtoM9UNAn3a6y3oj6wsvVreqNYw3xLJTrMANCJnMlx9UGr00J8qWGL7f"
);

export default function Checkout() {
  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
