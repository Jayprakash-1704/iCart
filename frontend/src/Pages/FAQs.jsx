
import  { useState } from "react";

import {
  HelpCircle,
  ShoppingCart,
  CreditCard,
  Truck,
  RotateCcw,
  PackageCheck,
  User,
  ChevronDown,
  MessageCircle,
} from "lucide-react";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "Orders",
      icon: ShoppingCart,
      questions: [
        {
          question: "How can I place an order?",
          answer:
            "Browse the products on our website, add the products you want to your cart, proceed to checkout, enter your delivery information, and complete the payment.",
        },
        {
          question: "Can I cancel my order?",
          answer:
            "You can request cancellation before your order is shipped. Once the order has been shipped, cancellation may no longer be possible and you may need to follow the return process.",
        },
        {
          question: "How can I check my order status?",
          answer:
            "You can check your order status from your account's order section. The status may include processing, shipped, delivered, or cancelled.",
        },
      ],
    },

    {
      category: "Payments",
      icon: CreditCard,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We support the payment methods displayed during checkout. Available options may include cards, UPI, net banking, wallets, or other supported payment methods.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Payments are processed through secure payment services. We take reasonable measures to protect your payment and account information.",
        },
        {
          question: "What happens if my payment fails?",
          answer:
            "If your payment fails, check your payment details and try again using an available payment method. If the amount was deducted but your order was not created, please contact customer support.",
        },
      ],
    },

    {
      category: "Shipping & Delivery",
      icon: Truck,
      questions: [
        {
          question: "How long will my order take to arrive?",
          answer:
            "Delivery time depends on your location, product availability, and the shipping provider. An estimated delivery date may be shown during checkout or in your order details.",
        },
        {
          question: "Can I change my delivery address?",
          answer:
            "You may contact customer support as soon as possible if you need to change your delivery address. Address changes may not be possible after the order has been shipped.",
        },
        {
          question: "What should I do if my order is delayed?",
          answer:
            "If your order has passed the estimated delivery date, check the latest tracking information and contact our support team if you need further assistance.",
        },
      ],
    },

    {
      category: "Returns & Refunds",
      icon: RotateCcw,
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "Eligible products can generally be returned within 7 days of delivery, provided they meet the conditions mentioned in our Return & Refund Policy.",
        },
        {
          question: "How long does a refund take?",
          answer:
            "After the returned product has been received and approved, the refund will be processed to the original payment method. The time required may vary depending on your payment provider or bank.",
        },
        {
          question: "Can I replace a damaged product?",
          answer:
            "If you receive a damaged, defective, or incorrect product, contact customer support with your order details and photographs. Depending on the situation and product availability, a replacement or refund may be offered.",
        },
      ],
    },

    {
      category: "Products",
      icon: PackageCheck,
      questions: [
        {
          question: "What if I receive the wrong product?",
          answer:
            "Please contact customer support as soon as possible and provide your order number along with clear photographs of the product and packaging.",
        },
        {
          question: "Are all products eligible for return?",
          answer:
            "No. Some products may be marked as non-returnable or may become ineligible if they have been used, damaged, altered, or returned without required packaging and accessories.",
        },
        {
          question: "Will the product look exactly like the image?",
          answer:
            "We make reasonable efforts to display products accurately. However, colours and appearance may vary slightly depending on your screen or device.",
        },
      ],
    },

    {
      category: "Account",
      icon: User,
      questions: [
        {
          question: "Do I need an account to place an order?",
          answer:
            "Account requirements depend on the checkout options available on our website. Creating an account may provide additional features such as order history and easier checkout.",
        },
        {
          question: "I forgot my password. What should I do?",
          answer:
            "Use the 'Forgot Password' option on the login page and follow the instructions to reset your password.",
        },
        {
          question: "Can I update my account information?",
          answer:
            "Yes. You can update available account information from your profile or account settings.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-indigo-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
            <HelpCircle size={28} />
          </div>

          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-indigo-200">
            Help Center
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
            Find answers to common questions about orders, payments,
            shipping, returns, refunds, and your account.
          </p>

        </div>
      </section>

      {/* ================= QUICK FEATURES ================= */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <ShoppingCart size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Orders
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Questions about placing and managing orders.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <CreditCard size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Payments
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Learn about payments and payment issues.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <Truck size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Delivery
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Find information about shipping and delivery.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <RotateCcw size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Returns
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Learn about returns, replacements, and refunds.
            </p>
          </div>

        </div>
      </section>

      {/* ================= FAQ CONTENT ================= */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">

          {faqs.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;

            return (
              <div
                key={category.category}
                className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
              >

                {/* Category Header */}
                <div className="mb-6 flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    <CategoryIcon size={21} />
                  </div>

                  <h2 className="text-xl font-bold text-gray-900">
                    {category.category}
                  </h2>

                </div>

                {/* Questions */}
                <div className="divide-y divide-gray-200">

                  {category.questions.map((faq, questionIndex) => {
                    const faqIndex =
                      `${categoryIndex}-${questionIndex}`;

                    const isOpen = openIndex === faqIndex;

                    return (
                      <div key={faq.question}>

                        <button
                          onClick={() => toggleFAQ(faqIndex)}
                          className="flex w-full items-center justify-between gap-4 py-5 text-left"
                        >
                          <span className="font-medium text-gray-900">
                            {faq.question}
                          </span>

                          <ChevronDown
                            size={20}
                            className={`shrink-0 text-gray-500 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="pb-5 pr-8">
                            <p className="text-sm leading-7 text-gray-600">
                              {faq.answer}
                            </p>
                          </div>
                        )}

                      </div>
                    );
                  })}

                </div>
              </div>
            );
          })}

          {/* ================= CONTACT SUPPORT ================= */}
          <div className="rounded-2xl bg-gray-900 p-6 text-white shadow-sm sm:p-8">

            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <MessageCircle size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    Still have questions?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Our support team is here to help you with your order
                    or any other questions.
                  </p>
                </div>

              </div>

              <button className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700">
                Contact Support
              </button>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default FAQs;

