
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Truck,
  Zap,
  CreditCard,
  Building2,
  Banknote,
  ShieldCheck,
  LockKeyhole,
  Tag,
  Minus,
  Plus,
  ShoppingBag,
  Smartphone,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "@/Redux/cartSlice";
import { load } from "@cashfreepayments/cashfree-js";
import { AuthContext } from "@/Context/AuthContext.jsx";
import { useLocation } from "@/Context/LocationContext";

const API_URL = "http://localhost:5000/api/payments";

const Checkout = () => {
  const { location } = useLocation();
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("upi");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { user } = useContext(AuthContext);

  const [address, setAddress] = useState({
    fullName: user.fullName,
    phone: "",
    street: location.area,
    city: location.city,
    state: location.state,
    pinCode: location.displayName.split(",")[6],
  });

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );



  const dispatch = useDispatch();

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  // Calculate delivery charges
  const shipping = delivery === "express" ? 49 : 0;

  // Sample coupon discount
  const discount = couponApplied
    ? Math.min(1000, subtotal + shipping)
    : 0;

  // Calculate final total
  const total = Math.max(
    0,
    subtotal + shipping - discount
  );

  // Handle address input changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddress((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Apply coupon
  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "ICART1000") {
      setCouponApplied(true);
      alert("Coupon applied successfully!");
    } else {
      setCouponApplied(false);
      alert("Invalid coupon code.");
    }
  };

  // Validate shipping address
  const validateAddress = () => {
    const {
      fullName,
      phone,
      street,
      city,
      state,
      pinCode,
    } = address;

    if (
      !fullName.trim() ||
      !phone.trim() ||
      !street.trim() ||
      !city.trim() ||
      !state ||
      !pinCode.trim()
    ) {
      alert("Please complete your shipping address.");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return false;
    }

    if (!/^\d{6}$/.test(pinCode.trim())) {
      alert("Please enter a valid 6-digit PIN code.");
      return false;
    }

    return true;
  };

  // Create Cashfree order and open checkout
  const createPayment = async () => {
  try {
    // Step 1: Save checkout details before redirecting to Cashfree
    sessionStorage.setItem(
  "icart_checkout",
  JSON.stringify({
    address,
    delivery,
    paymentMethod: payment,
    coupon: couponApplied ? coupon.trim().toUpperCase() : null,
    items: cartItems.map((item) => ({
      productId: item.productId || item._id,
      quantity: item.quantity,
    })),
  })
);

    // Step 2: Create the payment order
    const response = await fetch(`${API_URL}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        amount: total,
        customer: {
          customerId: user._id,
          customerPhone: address.phone,
          customerEmail: user.email,
        },
        address,
        delivery,
        paymentMethod: payment,
        coupon: couponApplied ? coupon.trim().toUpperCase() : null,
        items: cartItems.map((item) => ({
          productId: item.productId || item._id,
          quantity: item.quantity,
        })),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to create payment order."
      );
    }

    if (!data.paymentSessionId) {
      throw new Error(
        "Payment session ID was not returned by the backend."
      );
    }

    // Step 3: Open Cashfree checkout
    const cashfree = await load({
      mode: "sandbox",
    });

    await cashfree.checkout({
      paymentSessionId: data.paymentSessionId,
      redirectTarget: "_self",
    });
  } catch (error) {
    console.error("Payment error:", error);
    // Display the error using your existing toast or error UI.
  }
};

  // Handle Place Order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (isProcessing) return;

    if (!cartItems.length) {
      alert("Your cart is empty.");
      return;
    }

    if (!validateAddress()) {
      return;
    }

    if (total <= 0 && payment !== "cod") {
      alert(
        "Your order total must be greater than zero for online payment."
      );
      return;
    }

    try {
      setIsProcessing(true);

      if (payment === "cod") {
        /*
          Cash on Delivery requires a separate backend
          endpoint that creates a COD order in MongoDB.

          Do not treat this alert as an actual order.
        */
        alert(
          "Cash on Delivery is not connected yet. Please connect your COD order API."
        );
        return;
      }

      await createPayment();
    } catch (error) {
      console.error("Checkout error:", error);

      alert(
        error.message ||
        "Something went wrong during checkout."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50";

  const paymentOptions = [
    {
      id: "upi",
      title: "UPI",
      description: "Google Pay, PhonePe, Paytm",
      icon: Smartphone,
    },
    {
      id: "card",
      title: "Credit / Debit Card",
      description: "Visa, Mastercard and more",
      icon: CreditCard,
    },
    {
      id: "netbanking",
      title: "Net Banking",
      description: "Pay through your bank",
      icon: Building2,
    },
    {
      id: "cod",
      title: "Cash on Delivery",
      description: "Pay when your order arrives",
      icon: Banknote,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-12 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <ShoppingBag size={23} />
            </div>

            <span className="text-2xl font-black tracking-tight">
              iCart
            </span>
          </Link>

          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
            <LockKeyhole size={17} />
            Secure Checkout
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/cart"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Back to Cart
        </Link>

        <h1 className="mb-8 text-3xl font-black tracking-tight text-slate-900">
          Checkout
        </h1>

        <form
          onSubmit={handlePlaceOrder}
          className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(340px,0.9fr)]"
        >
          {/* Left Column */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <MapPin size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Shipping Address
                  </h2>

                  <p className="text-sm text-slate-500">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  Full Name *
                  <input
                    name="fullName"
                    value={address.fullName}
                    onChange={handleAddressChange}
                    placeholder="Enter your full name"
                    className={inputClass}
                    required
                  />
                </label>

                <label className="text-sm font-medium">
                  Phone Number *
                  <input
                    name="phone"
                    type="tel"
                    value={address.phone}
                    onChange={handleAddressChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    inputMode="numeric"
                    className={inputClass}
                    required
                  />
                </label>

                <label className="text-sm font-medium sm:col-span-2">
                  Street Address *
                  <input
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    placeholder="House number, street, landmark"
                    className={inputClass}
                    required
                  />
                </label>

                <label className="text-sm font-medium">
                  City *
                  <input
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    placeholder="Enter city"
                    className={inputClass}
                    required
                  />
                </label>

                <label className="text-sm font-medium">
                  State *
                  <select
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Select state</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </label>

                <label className="text-sm font-medium">
                  PIN Code *
                  <input
                    name="pinCode"
                    value={address.pinCode}
                    onChange={handleAddressChange}
                    placeholder="6-digit PIN code"
                    maxLength={6}
                    inputMode="numeric"
                    className={inputClass}
                    required
                  />
                </label>
              </div>
            </section>

            {/* Delivery Options */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Truck size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Delivery Options
                  </h2>

                  <p className="text-sm text-slate-500">
                    Choose your preferred delivery speed.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: "standard",
                    title: "Standard Delivery",
                    description: "Delivery in 5–7 business days",
                    price: "Free",
                    icon: Truck,
                  },
                  {
                    id: "express",
                    title: "Express Delivery",
                    description: "Faster delivery",
                    price: "₹49",
                    icon: Zap,
                  },
                ].map((option) => {
                  const Icon = option.icon;
                  const selected = delivery === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setDelivery(option.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${selected
                        ? "border-indigo-500 bg-indigo-50/60 ring-1 ring-indigo-500"
                        : "border-slate-200 hover:border-slate-300"
                        }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected
                          ? "border-indigo-600"
                          : "border-slate-300"
                          }`}
                      >
                        {selected && (
                          <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                        )}
                      </span>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600">
                        <Icon size={22} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">
                          {option.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {option.description}
                        </p>
                      </div>

                      <span className="text-sm font-bold text-emerald-600">
                        {option.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Payment Methods */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <CreditCard size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Payment Method
                  </h2>

                  <p className="text-sm text-slate-500">
                    Choose how you want to pay.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {paymentOptions.map((option) => {
                  const Icon = option.icon;
                  const selected = payment === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setPayment(option.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${selected
                        ? "border-indigo-500 bg-indigo-50/60"
                        : "border-slate-200 hover:border-slate-300"
                        }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected
                          ? "border-indigo-600"
                          : "border-slate-300"
                          }`}
                      >
                        {selected && (
                          <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                        )}
                      </span>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600">
                        <Icon size={21} />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-bold">
                          {option.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {payment === "cod" && (
                <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
                  Cash on Delivery requires a separate backend order
                  endpoint. It is not enabled in this example.
                </p>
              )}
            </section>
          </div>

          {/* Right Column */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            {/* Order Summary */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Order Summary
                </h2>

                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {cartItems.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}{" "}
                  items
                </span>
              </div>

              <div className="divide-y divide-slate-100 px-5">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-3 py-5"
                  >
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 p-2">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-1 text-sm font-bold text-slate-800">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.category}
                      </p>

                      <p className="mt-2 text-sm font-bold">
                        ₹{Number(item.price).toLocaleString("en-IN")}
                      </p>

                      <div className="mt-2 inline-flex items-center rounded-lg border border-slate-200">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(decreaseQuantity(item._id))
                          }
                          className="p-1.5 text-slate-500 hover:text-indigo-600"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus size={13} />
                        </button>

                        <span className="min-w-7 text-center text-xs font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            dispatch(increaseQuantity(item._id))
                          }
                          className="p-1.5 text-slate-500 hover:text-indigo-600"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm font-bold">
                      ₹
                      {(
                        Number(item.price) * item.quantity
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}

                {cartItems.length === 0 && (
                  <p className="py-8 text-center text-sm text-slate-500">
                    Your cart is empty.
                  </p>
                )}
              </div>

              <div className="space-y-4 border-t border-slate-100 p-5">
                {/* Coupon */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Have a coupon?
                  </label>

                  <div className="flex gap-2">
                    <div className="relative min-w-0 flex-1">
                      <Tag
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        value={coupon}
                        onChange={(e) => {
                          setCoupon(e.target.value);
                          setCouponApplied(false);
                        }}
                        placeholder="Enter coupon code"
                        className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-3 text-sm uppercase outline-none focus:border-indigo-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="rounded-xl bg-indigo-50 px-4 text-sm font-bold text-indigo-600 transition hover:bg-indigo-100"
                    >
                      Apply
                    </button>
                  </div>

                  {couponApplied && (
                    <p className="mt-2 text-xs font-medium text-emerald-600">
                      Coupon ICART1000 applied successfully!
                    </p>
                  )}

                  <p className="mt-2 text-xs text-slate-400">
                    Try ICART1000 for a sample ₹1,000 discount.
                  </p>
                </div>

                {/* Price Details */}
                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Subtotal</span>

                    <span className="font-medium text-slate-800">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Shipping</span>

                    <span className="font-medium text-emerald-600">
                      {shipping === 0
                        ? "Free"
                        : `₹${shipping.toLocaleString("en-IN")}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Discount</span>

                    <span className="font-medium text-emerald-600">
                      - ₹{discount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="font-bold text-slate-900">
                    Total Amount
                  </span>

                  <span className="text-2xl font-black text-slate-900">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Inclusive of applicable taxes.
                </p>
              </div>
            </section>

            {/* Security Benefits */}
            <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
              {[
                {
                  icon: ShieldCheck,
                  title: "Secure Checkout",
                  text: "Your information is protected.",
                },
                {
                  icon: Truck,
                  title: "Reliable Delivery",
                  text: "Track your order after dispatch.",
                },
                {
                  icon: ArrowLeft,
                  title: "Easy Returns",
                  text: "Returns according to our policy.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Icon size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </section>

            {/* Place Order */}
            <button
              type="submit"
              disabled={
                cartItems.length === 0 || isProcessing
              }
              className="flex w-full items-center justify-between rounded-2xl bg-indigo-600 px-5 py-4 text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="flex items-center gap-2 text-sm font-bold">
                <LockKeyhole size={18} />

                {isProcessing
                  ? "Processing..."
                  : payment === "cod"
                    ? "Place COD Order"
                    : "Pay Securely"}
              </span>

              <span className="text-lg font-black">
                ₹{total.toLocaleString("en-IN")} →
              </span>
            </button>

            <p className="text-center text-xs text-slate-400">
              By placing your order, you agree to our terms and
              conditions.
            </p>
          </aside>
        </form>
      </main>
    </div>
  );
};

export default Checkout;

