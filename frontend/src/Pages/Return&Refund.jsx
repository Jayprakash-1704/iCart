
import "react";
import {
  RotateCcw,
  PackageCheck,
  WalletCards,
  Clock,
  XCircle,
  HelpCircle,
  ArrowRight,
  RefreshCcw,
} from "lucide-react";

const ReturnRefund = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-indigo-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
            <RotateCcw size={28} />
          </div>

          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-indigo-200">
            Easy & Simple
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">
            Return & Refund Policy
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
            We want you to be completely satisfied with your purchase.
            Learn how returns, replacements, and refunds work.
          </p>

        </div>
      </section>

      {/* ================= QUICK FEATURES ================= */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <RotateCcw size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Easy Returns
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Request a return within our eligible return period.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <PackageCheck size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Product Replacement
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Receive a replacement for eligible damaged products.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <WalletCards size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Secure Refunds
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Eligible refunds are processed securely.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <Clock size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Quick Processing
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              We process approved requests as quickly as possible.
            </p>
          </div>

        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">

          {/* Return Eligibility */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <PackageCheck size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Return Eligibility
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Products may be eligible for return if they meet the
                  conditions below:
                </p>

                <ul className="mt-4 space-y-3 text-sm text-gray-600">

                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">✓</span>
                    The return request is submitted within 7 days of delivery.
                  </li>

                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">✓</span>
                    The product is unused and in its original condition.
                  </li>

                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">✓</span>
                    Original packaging, accessories, and tags are included.
                  </li>

                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">✓</span>
                    Proof of purchase or order details are available.
                  </li>

                </ul>
              </div>

            </div>
          </div>

          {/* Return Process */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-xl font-bold text-gray-900">
              How to Return a Product
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Follow these simple steps to request a return:
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-4">

              <div className="rounded-xl bg-gray-50 p-5">
                <span className="text-2xl font-bold text-indigo-600">
                  01
                </span>

                <h3 className="mt-3 font-semibold text-gray-900">
                  Contact Us
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Contact our support team with your order details.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <span className="text-2xl font-bold text-indigo-600">
                  02
                </span>

                <h3 className="mt-3 font-semibold text-gray-900">
                  Request Review
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Our team will review your return request.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <span className="text-2xl font-bold text-indigo-600">
                  03
                </span>

                <h3 className="mt-3 font-semibold text-gray-900">
                  Send Product
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Follow the instructions provided for returning the item.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <span className="text-2xl font-bold text-indigo-600">
                  04
                </span>

                <h3 className="mt-3 font-semibold text-gray-900">
                  Get Refund
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Once approved, your refund will be processed.
                </p>
              </div>

            </div>
          </div>

          {/* Refund Policy */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <WalletCards size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Refund Policy
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Once your returned product has been received and
                  inspected, we will notify you about the approval or
                  rejection of your refund.
                </p>

                <p className="mt-3 leading-7 text-gray-600">
                  If your refund is approved, the amount will be
                  processed to your original payment method.
                </p>

                <div className="mt-5 rounded-lg bg-indigo-50 p-4">
                  <p className="text-sm leading-6 text-indigo-800">
                    Refund processing time may vary depending on your
                    payment provider or bank.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Replacement */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <RefreshCcw size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Damaged or Defective Products
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  If you receive a damaged, defective, or incorrect
                  product, contact us as soon as possible. Please
                  provide your order number and clear photographs of
                  the product and packaging.
                </p>

                <p className="mt-3 leading-7 text-gray-600">
                  Depending on the situation, we may offer a replacement
                  or refund after reviewing the request.
                </p>

                <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700">
                  Contact Support
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>
          </div>

          {/* Non Returnable */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
                <XCircle size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Non-Returnable Products
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Some products may not be eligible for return due
                  to their nature or condition. Examples may include:
                </p>

                <ul className="mt-4 space-y-3 text-sm text-gray-600">

                  <li className="flex gap-3">
                    <span className="text-red-500">•</span>
                    Products marked as non-returnable on the product page.
                  </li>

                  <li className="flex gap-3">
                    <span className="text-red-500">•</span>
                    Products that have been used, damaged, or altered by the customer.
                  </li>

                  <li className="flex gap-3">
                    <span className="text-red-500">•</span>
                    Products returned without required accessories or packaging.
                  </li>

                </ul>
              </div>

            </div>
          </div>

          {/* Cancellation */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-xl font-bold text-gray-900">
              Order Cancellation
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              You may request cancellation before your order has been
              shipped. Once an order has been shipped, cancellation
              may no longer be possible and you may need to follow the
              return process after delivery.
            </p>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl bg-gray-900 p-6 text-white shadow-sm sm:p-8">

            <div className="flex items-center gap-3">
              <HelpCircle size={24} />
              <h2 className="text-2xl font-bold">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="mt-7 space-y-6">

              <div>
                <h3 className="font-semibold">
                  How long do I have to return an item?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Eligible products can generally be returned within
                  7 days of delivery.
                </p>
              </div>

              <div className="border-t border-gray-700 pt-5">
                <h3 className="font-semibold">
                  When will I receive my refund?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  After the returned product is inspected and the
                  refund is approved, processing time depends on your
                  original payment method and bank.
                </p>
              </div>

              <div className="border-t border-gray-700 pt-5">
                <h3 className="font-semibold">
                  Can I exchange a product?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Eligible damaged, defective, or incorrect products
                  may qualify for replacement depending on availability.
                </p>
              </div>

              <div className="border-t border-gray-700 pt-5">
                <h3 className="font-semibold">
                  What should I do if I receive the wrong product?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Contact customer support with your order number and
                  photographs of the received product.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ReturnRefund;

