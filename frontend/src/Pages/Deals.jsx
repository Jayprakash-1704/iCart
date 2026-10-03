import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  ShoppingCart,
  ArrowRight,
  Zap,
  Tag,
  Copy,
  Check,
  Flame,
} from "lucide-react";

const deals = [
  {
    id: 1,
    name: "Wireless Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    price: 1799,
    oldPrice: 2999,
    discount: 40,
    rating: 4.6,
  },
  {
    id: 2,
    name: "Smart Watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    price: 2499,
    oldPrice: 3999,
    discount: 38,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    price: 1999,
    oldPrice: 3499,
    discount: 43,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Premium Backpack",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    price: 1299,
    oldPrice: 2199,
    discount: 41,
    rating: 4.4,
  },
];

const categories = [
  {
    name: "Electronics",
    discount: "Up to 50% OFF",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
  },
  {
    name: "Fashion",
    discount: "Up to 60% OFF",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600",
  },
  {
    name: "Home & Kitchen",
    discount: "Up to 40% OFF",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600",
  },
  {
    name: "Accessories",
    discount: "Up to 55% OFF",
    image:
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=600",
  },
];

function Deals() {
  const [time, setTime] = useState({
    hours: 8,
    minutes: 42,
    seconds: 18,
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;

            if (hours > 0) {
              hours--;
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const copyCoupon = () => {
    navigator.clipboard.writeText("ICART20");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="min-h-105 flex flex-col md:flex-row items-center justify-between gap-10 py-16">

            {/* Hero Content */}
            <div className="max-w-xl">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium">
                  Limited Time Offers
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Mega Deals
                <span className="block text-indigo-400">
                  Up to 60% OFF
                </span>
              </h1>

              <p className="mt-5 text-gray-300 text-lg">
                Discover incredible deals on your favorite products.
                Grab them before the offers disappear.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 transition"
                >
                  Shop Deals
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/categories"
                  className="px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 transition"
                >
                  Explore Categories
                </Link>

              </div>
            </div>

            {/* Countdown */}
            <div className="w-full max-w-md">

              <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-7">

                <div className="flex items-center gap-2 mb-5">
                  <Clock className="w-5 h-5 text-indigo-400" />
                  <span className="font-medium">
                    Flash Sale Ends In
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">

                  <div className="bg-white/10 rounded-2xl p-5 text-center">
                    <p className="text-3xl font-bold">
                      {String(time.hours).padStart(2, "0")}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      HOURS
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-5 text-center">
                    <p className="text-3xl font-bold">
                      {String(time.minutes).padStart(2, "0")}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      MINUTES
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-5 text-center">
                    <p className="text-3xl font-bold">
                      {String(time.seconds).padStart(2, "0")}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      SECONDS
                    </p>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= FLASH SALE ================= */}
      <section className="py-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-8">

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-semibold text-orange-500">
                  LIMITED TIME
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900">
                Flash Sale
              </h2>

              <p className="text-gray-500 mt-1">
                Grab these deals before they're gone.
              </p>
            </div>

            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>


          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {deals.map((product) => (

              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300"
              >

                {/* Image */}
                <div className="relative h-60 bg-gray-100 overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">
                    -{product.discount}%
                  </span>

                </div>


                {/* Content */}
                <div className="p-5">

                  <h3 className="font-semibold text-gray-900">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-500">
                      {product.rating}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3">

                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>

                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.oldPrice.toLocaleString()}
                    </span>

                  </div>

                  <button className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-indigo-600 transition">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>


      {/* ================= CATEGORY DEALS ================= */}
      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">

            <div className="flex justify-center mb-3">
              <Tag className="w-6 h-6 text-indigo-600" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Deals by Category
            </h2>

            <p className="text-gray-500 mt-2">
              Save more on the categories you love.
            </p>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {categories.map((category) => (

              <Link
                to="/shop"
                key={category.name}
                className="group relative h-64 rounded-2xl overflow-hidden"
              >

                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition" />

                <div className="relative h-full flex flex-col justify-end p-6 text-white">

                  <h3 className="text-xl font-bold">
                    {category.name}
                  </h3>

                  <p className="text-sm text-gray-200 mt-1">
                    {category.discount}
                  </p>

                  <span className="flex items-center gap-2 text-sm mt-4">
                    Shop Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </span>

                </div>

              </Link>

            ))}

          </div>

        </div>
      </section>


      {/* ================= DEAL OF THE DAY ================= */}
      <section className="py-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-indigo-50 rounded-3xl overflow-hidden">

            <div className="grid md:grid-cols-2 items-center">

              {/* Image */}
              <div className="h-87.5 md:h-112.5">

                <img
                  src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900"
                  alt="Deal of the Day"
                  className="w-full h-full object-cover"
                />

              </div>

              {/* Content */}
              <div className="p-8 md:p-12">

                <span className="inline-block px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-bold">
                  DEAL OF THE DAY
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-5">
                  Premium Wireless
                  <span className="block text-indigo-600">
                    Headphones
                  </span>
                </h2>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  Experience powerful sound and premium comfort with
                  our limited-time headphone deal.
                </p>

                <div className="flex items-center gap-3 mt-6">

                  <span className="text-3xl font-bold">
                    ₹2,999
                  </span>

                  <span className="text-lg text-gray-400 line-through">
                    ₹4,999
                  </span>

                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                    40% OFF
                  </span>

                </div>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 mt-7 px-7 py-3 rounded-full bg-gray-900 text-white hover:bg-indigo-600 transition"
                >
                  Buy Now
                  <ArrowRight className="w-4 h-4" />
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= COUPON ================= */}
      <section className="pb-20">

        <div className="max-w-4xl mx-auto px-4">

          <div className="relative overflow-hidden rounded-3xl bg-gray-900 text-white p-8 md:p-12 text-center">

            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-indigo-600/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="relative">

              <Tag className="w-8 h-8 mx-auto text-indigo-400" />

              <h2 className="text-3xl font-bold mt-4">
                Extra 20% OFF
              </h2>

              <p className="text-gray-400 mt-2">
                Use this exclusive coupon on your next purchase.
              </p>


              <div className="inline-flex items-center gap-3 mt-7 p-2 pl-5 bg-white/10 rounded-full border border-white/10">

                <span className="font-bold tracking-widest">
                  ICART20
                </span>

                <button
                  onClick={copyCoupon}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-900 hover:bg-gray-100 transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Deals;