import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Payment Successful</h1>
        <p className="text-gray-700 mb-4">Thank you — your payment was processed successfully.</p>
        <Link to="/dashboard/bookings" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">
          Back to Bookings
        </Link>
      </div>
    </div>
  );
}
