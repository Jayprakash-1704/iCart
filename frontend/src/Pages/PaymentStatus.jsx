
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  LoaderCircle,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/payments";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  console.log("PaymentStatus: order_id =", orderId);

  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState(
    "Please wait while we verify your payment."
  );
  const [order, setOrder] = useState(null);

  const verificationStarted = useRef(false);

  const verifyPayment = async () => {
    if (!orderId) {
      setStatus("failed");
      setMessage("Order ID is missing. We cannot verify your payment.");
      return;
    }

    const savedCheckout = sessionStorage.getItem("icart_checkout");

    if (!savedCheckout) {
      setStatus("failed");
      setMessage(
        "Checkout information was not found. Please contact support before attempting payment again."
      );
      return;
    }

    let checkoutData;

    try {
      checkoutData = JSON.parse(savedCheckout);

      if (
        !Array.isArray(checkoutData.items) ||
        checkoutData.items.length === 0 ||
        !checkoutData.address
      ) {
        throw new Error("Invalid checkout information.");
      }
    } catch (error) {
      setStatus("failed");
      setMessage(error.message || "Checkout information is invalid.");
      return;
    }

    setStatus("processing");
    setMessage("Verifying your payment and saving your order...");
    setOrder(null);

    try {
      const response = await fetch(`${API_URL}/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          orderId,
          items: checkoutData.items,
          address: checkoutData.address,
          delivery: checkoutData.delivery,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Payment verification failed."
        );
      }

      setOrder(data.order || null);
      setStatus("success");
      setMessage(
        data.message ||
          "Your payment was verified and your order was placed successfully."
      );

      sessionStorage.removeItem("icart_checkout");
    } catch (error) {
      console.error("Payment verification error:", error);

      setStatus("failed");
      setMessage(
        error.message ||
          "We could not verify your payment right now. Please try again."
      );
    }
  };

  useEffect(() => {
    if (!verificationStarted.current) {
      verificationStarted.current = true;
      verifyPayment();
    }
  }, []);

  const isSuccess = status === "success";
  const isFailed = status === "failed";

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl sm:p-10">
        {/* Status Icon */}
        <div
          className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full ${
            isSuccess
              ? "bg-green-100 text-green-600"
              : isFailed
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 size={52} />
          ) : isFailed ? (
            <XCircle size={52} />
          ) : (
            <LoaderCircle size={48} className="animate-spin" />
          )}
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          {isSuccess
            ? "Payment Successful!"
            : isFailed
              ? "Payment Verification Failed"
              : "Verifying Your Payment"}
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
          {message}
        </p>

        {/* Order Details */}
        {orderId && (
          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Cashfree Order ID
            </p>

            <p className="mt-1 break-all text-sm font-semibold text-slate-800">
              {orderId}
            </p>

            {order?._id && (
              <>
                <div className="my-3 border-t border-slate-200" />

                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  iCart Order ID
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                  {order._id}
                </p>
              </>
            )}

            <div className="my-3 border-t border-slate-200" />

            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-500">
                Payment status
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  isSuccess
                    ? "bg-green-100 text-green-700"
                    : isFailed
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {isSuccess
                  ? "PAID"
                  : isFailed
                    ? "NOT VERIFIED"
                    : "PROCESSING"}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          {isSuccess ? (
            <>
              <Link
                to="/my-orders"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <ShoppingBag size={19} />
                View My Orders
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/shop"
                className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Continue Shopping
              </Link>
            </>
          ) : isFailed ? (
            <>
              <button
                type="button"
                onClick={verifyPayment}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <RefreshCw size={18} />
                Retry Verification
              </button>

              <Link
                to="/shop"
                className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Continue Shopping
              </Link>
            </>
          ) : (
            <p className="text-xs text-slate-400">
              Please wait while we confirm your payment.
            </p>
          )}
        </div>

        <p className="mt-8 text-xs text-slate-400">
          Secure payments powered by Cashfree · iCart
        </p>
      </div>
    </div>
  );
};

export default PaymentStatus;

