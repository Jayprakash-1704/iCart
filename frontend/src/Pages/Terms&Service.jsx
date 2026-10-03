
import "react";

import {
  FileText,
  UserCheck,
  ShoppingCart,
  CreditCard,
  Truck,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  XCircle,
  HelpCircle,
} from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-indigo-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
            <FileText size={28} />
          </div>

          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-indigo-200">
            Terms & Conditions
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">
            Terms of Service
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
            Please read these terms carefully before using our website,
            purchasing products, or accessing our services.
          </p>

          <p className="mt-4 text-sm text-indigo-200">
            Last updated: October 2, 2026
          </p>

        </div>
      </section>

      {/* ================= QUICK FEATURES ================= */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Account */}
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <UserCheck size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              User Accounts
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Keep your account information accurate and secure.
            </p>
          </div>

          {/* Orders */}
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <ShoppingCart size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Orders
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Understand how orders, cancellations, and availability work.
            </p>
          </div>

          {/* Payments */}
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <CreditCard size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Secure Payments
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Payments are processed through available payment methods.
            </p>
          </div>

          {/* Shipping */}
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <Truck size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Shipping
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Delivery times may vary depending on location and courier.
            </p>
          </div>

        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">

          {/* 1. Acceptance */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <FileText size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  1. Acceptance of Terms
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  By accessing or using our website, you agree to be bound
                  by these Terms of Service. These terms apply to all
                  visitors, registered users, and customers of our
                  e-commerce platform.
                </p>
              </div>

            </div>
          </div>

          {/* 2. User Account */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <UserCheck size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  2. User Accounts
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Some features of our website may require you to create
                  an account. You are responsible for providing accurate
                  information and maintaining the security of your account.
                </p>

                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">✓</span>
                    Provide accurate and complete information.
                  </li>

                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">✓</span>
                    Keep your login credentials confidential.
                  </li>

                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">✓</span>
                    Notify us if you suspect unauthorised access.
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* 3. Products */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <ShoppingCart size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  3. Products and Product Information
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  We make reasonable efforts to ensure that product
                  descriptions, images, prices, specifications, and
                  availability are accurate. However, product colours and
                  appearance may vary depending on your device.
                </p>

                <p className="mt-3 leading-7 text-gray-600">
                  Product availability may change without prior notice.
                </p>
              </div>

            </div>
          </div>

          {/* 4. Pricing */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <CreditCard size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  4. Pricing and Payments
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Product prices are displayed on our website and may
                  change from time to time. We reserve the right to correct
                  pricing errors or promotional mistakes.
                </p>

                <p className="mt-3 leading-7 text-gray-600">
                  You agree to provide valid payment information and confirm
                  that you are authorised to use the selected payment method.
                </p>
              </div>

            </div>
          </div>

          {/* 5. Orders */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <ShoppingCart size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  5. Orders and Cancellation
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  When you place an order, you are requesting to purchase
                  the selected products. Orders are subject to product
                  availability and acceptance.
                </p>

                <p className="mt-3 leading-7 text-gray-600">
                  We may cancel an order in situations such as incorrect
                  pricing, product unavailability, payment issues, or
                  suspected fraudulent activity.
                </p>

                <div className="mt-5 rounded-lg bg-indigo-50 p-4">
                  <p className="text-sm leading-6 text-indigo-800">
                    You may request cancellation before your order has been
                    shipped. Once shipped, you may need to follow the return
                    process.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* 6. Shipping */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Truck size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  6. Shipping and Delivery
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Orders will be shipped using the delivery options
                  available at checkout. Delivery times are estimates and
                  may vary depending on your location and the shipping
                  provider.
                </p>

                <p className="mt-3 leading-7 text-gray-600">
                  Customers are responsible for providing accurate shipping
                  and contact information.
                </p>
              </div>

            </div>
          </div>

          {/* 7. Returns */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <RotateCcw size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  7. Returns and Refunds
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Returns and refunds are handled according to our Return &
                  Refund Policy. Eligibility may depend on the product,
                  condition, and time since delivery.
                </p>

                <p className="mt-3 leading-7 text-gray-600">
                  Please review our Return & Refund Policy before submitting
                  a return request.
                </p>
              </div>

            </div>
          </div>

          {/* 8. Prohibited Activities */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
                <XCircle size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  8. Prohibited Activities
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  You agree not to misuse our website or services.
                </p>

                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-red-500">•</span>
                    Use the website for unlawful purposes.
                  </li>

                  <li className="flex gap-3">
                    <span className="text-red-500">•</span>
                    Provide false or misleading information.
                  </li>

                  <li className="flex gap-3">
                    <span className="text-red-500">•</span>
                    Attempt to access another user's account.
                  </li>

                  <li className="flex gap-3">
                    <span className="text-red-500">•</span>
                    Use fraudulent payment methods.
                  </li>

                  <li className="flex gap-3">
                    <span className="text-red-500">•</span>
                    Interfere with the website or its security.
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* 9. Intellectual Property */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  9. Intellectual Property
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  All content on this website, including logos, graphics,
                  product information, text, designs, and software, is
                  owned by or licensed to us and may not be copied,
                  reproduced, or distributed without permission.
                </p>
              </div>

            </div>
          </div>

          {/* 10. Liability */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                <AlertCircle size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  10. Limitation of Liability
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  To the extent permitted by applicable law, we are not
                  responsible for indirect or consequential losses resulting
                  from the use of our website or services.
                </p>

                <p className="mt-3 leading-7 text-gray-600">
                  We are also not responsible for delays or interruptions
                  caused by circumstances outside our reasonable control.
                </p>
              </div>

            </div>
          </div>

          {/* 11. Changes */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">
              11. Changes to These Terms
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              We may update these Terms of Service from time to time.
              Changes will be posted on this page along with an updated
              "Last updated" date.
            </p>
          </div>

          {/* ================= FAQ ================= */}
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
                  Do I need an account to place an order?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Account requirements depend on the features and checkout
                  process available on our website.
                </p>
              </div>

              <div className="border-t border-gray-700 pt-5">
                <h3 className="font-semibold">
                  Can I cancel my order?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  You may request cancellation before your order is shipped,
                  subject to our cancellation policy.
                </p>
              </div>

              <div className="border-t border-gray-700 pt-5">
                <h3 className="font-semibold">
                  How can I return a product?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Please refer to our Return & Refund Policy for information
                  about eligibility and the return process.
                </p>
              </div>

              <div className="border-t border-gray-700 pt-5">
                <h3 className="font-semibold">
                  How can I contact customer support?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  You can contact our customer support team using the contact
                  information provided on our website.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default TermsOfService;

