import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../Redux/cartSlice";
import { useEffect, useRef } from "react";



const Cart = () => {
   const scrollRef = useRef(null);
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    
    })}
    ,[])



  const dispatch = useDispatch();
  const navigate=useNavigate()

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  // Calculate total quantity
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 15000 ? 0 : (subtotal*10)/100;

  const total = subtotal + shipping;

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center">

          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100">
            <ShoppingBag className="h-12 w-12 text-indigo-500" />
          </div>

          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="mb-6 text-center text-gray-500">
            Looks like you haven't added anything to your cart yet.
          </p>

          <Link
            to="/shop"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            <ShoppingBag className="h-5 w-5" />
            Continue Shopping
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <button
            onClick={() => dispatch(clearCart())}
            className="flex cursor-pointer items-center gap-2 self-start rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Clear Cart
          </button>

        </div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-3">

          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">

            {cartItems.map((item) => (

              <div
                key={item._id}
                ref={scrollRef}
                className="rounded-2xl border border-gray-200 hover:border-indigo-400 bg-white p-4 shadow-sm sm:p-5"
              >

                <div className="flex flex-col gap-5 sm:flex-row">

                  {/* Product Image */}
                  <div className="flex h-32 w-full shrink-0 items-center justify-center rounded-xl bg-gray-100 sm:w-32">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full rounded-xl object-contain p-3"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col justify-between">

                    <div className="flex justify-between gap-4">

                      <div>
                        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                          {item.category}
                        </p>

                        <h2 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h2>

                        <p className="mt-1 text-lg font-bold text-indigo-600">
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() =>
                          dispatch(removeFromCart(item))
                        }
                        className="cursor-pointer rounded-full p-4 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        title="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>

                    </div>

                    {/* Quantity */}
                    <div className="mt-5 flex items-center justify-between">

                      <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">

                        <button
                          onClick={() =>
                            dispatch(decreaseQuantity(item._id))
                          }
                          className="flex h-9 w-9 cursor-pointer items-center justify-center text-gray-600 transition hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="flex h-9 w-10 items-center justify-center border-x border-gray-200 text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            dispatch(increaseQuantity(item._id))
                          }
                          className="flex h-9 w-9 cursor-pointer items-center justify-center text-gray-600 transition hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>

                      </div>

                      {/* Item Total */}
                      <p className="text-lg font-bold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">

            <div className="sticky top-24 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">

              <h2 className="mb-6 text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              {/* Subtotal */}
              <div className="mb-4 flex items-center justify-between text-gray-600">
                <span>Subtotal</span>

                <span className="font-medium text-gray-900">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Shipping */}
              <div className="mb-4 flex items-center justify-between text-gray-600">
                <span>Shipping</span>

                <span className="font-medium text-green-600">
                  ₹{shipping.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="my-5 border-t border-gray-200" />

              {/* Total */}
              <div className="mb-6 flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-indigo-600">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Checkout */}
              <button
                onClick={() => navigate('/check-out')}
                className="w-full cursor-pointer rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <Link
                to="/shop"
                className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;