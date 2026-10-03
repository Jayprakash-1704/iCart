
import "react";
import {
  Truck,
  MapPin,
  Clock,
  Package,
  RefreshCcw,
  HelpCircle,
} from "lucide-react";

const ShippingInformation = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-indigo-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
            <Truck size={28} />
          </div>

          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-indigo-200">
            Delivery Information
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">
            Shipping Information
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
            Everything you need to know about our shipping, delivery
            times, charges, and order tracking.
          </p>

        </div>
      </section>

      {/* ================= SHIPPING FEATURES ================= */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Delivery */}
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <Truck size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Fast Delivery
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Get your orders delivered quickly and safely.
            </p>
          </div>

          {/* Tracking */}
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <Package size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Order Tracking
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Track your order from dispatch to delivery.
            </p>
          </div>

          {/* Locations */}
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <MapPin size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Wide Coverage
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              We deliver to locations across India.
            </p>
          </div>

          {/* Support */}
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <HelpCircle size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Need Help?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Our support team is here to help with your order.
            </p>
          </div>

        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">

          {/* Processing Time */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Clock size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Order Processing Time
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Orders are generally processed within 1–2 business
                  days after your order has been successfully placed.
                  Orders placed on weekends or public holidays may be
                  processed on the next business day.
                </p>
              </div>

            </div>
          </div>

          {/* Delivery Time */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Truck size={21} />
              </div>

              <div className="w-full">
                <h2 className="text-xl font-bold text-gray-900">
                  Delivery Time
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Delivery times may vary depending on your location
                  and the availability of the product.
                </p>

                <div className="mt-5 overflow-hidden rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
                    <span>Location</span>
                    <span>Estimated Delivery</span>
                  </div>

                  <div className="grid grid-cols-2 border-t px-4 py-4 text-sm text-gray-600">
                    <span>Metro Cities</span>
                    <span>2–4 Business Days</span>
                  </div>

                  <div className="grid grid-cols-2 border-t px-4 py-4 text-sm text-gray-600">
                    <span>Other Cities</span>
                    <span>3–6 Business Days</span>
                  </div>

                  <div className="grid grid-cols-2 border-t px-4 py-4 text-sm text-gray-600">
                    <span>Remote Areas</span>
                    <span>5–10 Business Days</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Shipping Charges */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Package size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Shipping Charges
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Shipping charges are calculated based on your
                  delivery location, order value, and the size or
                  weight of the package.
                </p>

                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-indigo-600">•</span>
                    Free shipping may be available on qualifying orders.
                  </li>

                  <li className="flex gap-2">
                    <span className="text-indigo-600">•</span>
                    Shipping charges will be displayed during checkout.
                  </li>

                  <li className="flex gap-2">
                    <span className="text-indigo-600">•</span>
                    Additional charges may apply to remote locations.
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Tracking */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <MapPin size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Order Tracking
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Once your order has been shipped, you will receive
                  tracking information. You can use the tracking
                  number to monitor the status and location of your
                  package.
                </p>

                <button className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700">
                  Track My Order
                </button>
              </div>

            </div>
          </div>

          {/* Delivery Issues */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <HelpCircle size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Delivery Delays
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Although we work to deliver orders within the
                  estimated timeframe, unexpected delays may occur
                  because of weather conditions, transportation
                  problems, holidays, or other circumstances outside
                  our control.
                </p>
              </div>

            </div>
          </div>

          {/* Damaged Package */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <RefreshCcw size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Damaged or Incorrect Package
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  If your package arrives damaged or you receive an
                  incorrect product, please contact our customer
                  support team as soon as possible with your order
                  details and photographs of the package.
                </p>

                <button className="mt-5 rounded-lg border border-indigo-600 px-5 py-2.5 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50">
                  Contact Support
                </button>
              </div>

            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl bg-gray-900 p-6 text-white shadow-sm sm:p-8">

            <h2 className="text-2xl font-bold">
              Frequently Asked Questions
            </h2>

            <div className="mt-6 space-y-5">

              <div>
                <h3 className="font-semibold">
                  Can I change my delivery address?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Address changes may be possible if your order has
                  not yet been shipped. Contact support as soon as
                  possible.
                </p>
              </div>

              <div className="border-t border-gray-700 pt-5">
                <h3 className="font-semibold">
                  What if I am not available during delivery?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  The delivery partner may attempt delivery again
                  according to their delivery policy.
                </p>
              </div>

              <div className="border-t border-gray-700 pt-5">
                <h3 className="font-semibold">
                  How can I contact you about my shipment?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Visit our Contact Us page and provide your order
                  number so our support team can assist you.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ShippingInformation;

