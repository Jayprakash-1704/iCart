
import  { useState } from "react";
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  MapPin,
  Clock,
} from "lucide-react";

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleTrackOrder = (e) => {
    e.preventDefault();

    if (!trackingNumber.trim()) {
      setError("Please enter your order or tracking number.");
      setOrder(null);
      return;
    }

    setError("");

    // Temporary demo data.
    // Later replace this with an API request.
    setOrder({
      orderNumber: trackingNumber,
      status: "Out for Delivery",
      estimatedDelivery: "Today",
      items: 2,
      currentLocation: "Bhopal Delivery Hub",
      timeline: [
        {
          title: "Order Placed",
          description: "Your order has been successfully placed.",
          date: "Oct 1, 2026",
          completed: true,
        },
        {
          title: "Order Confirmed",
          description: "Your order has been confirmed by the seller.",
          date: "Oct 1, 2026",
          completed: true,
        },
        {
          title: "Shipped",
          description: "Your package has been shipped.",
          date: "Oct 2, 2026",
          completed: true,
        },
        {
          title: "Out for Delivery",
          description: "Your package is with the delivery partner.",
          date: "Oct 2, 2026",
          completed: true,
        },
        {
          title: "Delivered",
          description: "Your package will be delivered to your address.",
          date: "Expected today",
          completed: false,
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-indigo-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
            <Truck size={28} />
          </div>

          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-indigo-200">
            Order Tracking
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">
            Track Your Order
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
            Enter your order or tracking number to check the latest
            status of your delivery.
          </p>

        </div>
      </section>

      {/* ================= TRACKING FORM ================= */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">

          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-xl font-bold text-gray-900">
              Enter Tracking Number
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              You can find your tracking number in your order
              confirmation or shipping email.
            </p>

            <form
              onSubmit={handleTrackOrder}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >

              <div className="relative flex-1">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter order ID or tracking number"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
              >
                <Search size={18} />
                Track Order
              </button>

            </form>

            {error && (
              <p className="mt-3 text-sm text-red-500">
                {error}
              </p>
            )}

          </div>

        </div>
      </section>

      {/* ================= ORDER DETAILS ================= */}
      {order && (
        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-6">

            {/* Status Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                <div>
                  <p className="text-sm text-gray-500">
                    Order Number
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900">
                    #{order.orderNumber}
                  </h2>
                </div>

                <div className="rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  {order.status}
                </div>

              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">

                <div className="rounded-xl bg-gray-50 p-5">
                  <Clock size={21} className="text-indigo-600" />

                  <p className="mt-3 text-sm text-gray-500">
                    Estimated Delivery
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {order.estimatedDelivery}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-5">
                  <Package size={21} className="text-indigo-600" />

                  <p className="mt-3 text-sm text-gray-500">
                    Items
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {order.items} Products
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-5">
                  <MapPin size={21} className="text-indigo-600" />

                  <p className="mt-3 text-sm text-gray-500">
                    Current Location
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {order.currentLocation}
                  </p>
                </div>

              </div>

            </div>

            {/* ================= TIMELINE ================= */}
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-xl font-bold text-gray-900">
                Order Status
              </h2>

              <div className="mt-8">

                {order.timeline.map((item, index) => (
                  <div
                    key={item.title}
                    className="relative flex gap-4 pb-8 last:pb-0"
                  >

                    {/* Vertical Line */}
                    {index !== order.timeline.length - 1 && (
                      <div className="absolute left-5 top-10 h-full w-px bg-gray-200" />
                    )}

                    {/* Icon */}
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        item.completed
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle size={19} />
                      ) : (
                        <Clock size={19} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">

                      <div className="flex flex-col justify-between gap-1 sm:flex-row">
                        <h3
                          className={`font-semibold ${
                            item.completed
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {item.title}
                        </h3>

                        <span className="text-xs text-gray-400">
                          {item.date}
                        </span>
                      </div>

                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        {item.description}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* ================= HELP ================= */}
            <div className="rounded-2xl bg-gray-900 p-6 text-white sm:p-8">

              <h2 className="text-xl font-bold">
                Need help with your order?
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                If your order has been delayed or you have any questions
                about your delivery, our support team can help.
              </p>

              <button className="mt-5 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100">
                Contact Support
              </button>

            </div>

          </div>
        </section>
      )}

    </div>
  );
};

export default TrackOrder;

