/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products", {
         
        });
        

        const data = await response.json();
        console.log(data);
        
        setProducts(data.slice(0,8));
      } catch (error) {
        console.log("Error fetching products:", error);
        setLoading(false);
      }
      finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);




  const categories = [
    {
      name: "Electronics",
      count: "1,200+ Products",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Fashion",
      count: "2,500+ Products",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Home & Living",
      count: "900+ Products",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Beauty",
      count: "700+ Products",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80",
    },
  ];



  const benefits = [
    {
      icon: "🚚",
      title: "Free Delivery",
      text: "Free shipping on orders above ₹999",
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      text: "100% secure payment methods",
    },
    {
      icon: "↩️",
      title: "Easy Returns",
      text: "7-day easy return policy",
    },
    {
      icon: "💬",
      title: "24/7 Support",
      text: "We're always here to help",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ================= NAV PROMO ================= */}
      <div className="bg-indigo-600 text-white text-center py-2 px-4 text-sm">
        🎉 Get extra 15% OFF on your first order — Use code{" "}
        <span className="font-bold">WELCOME15</span>
      </div>

      {/* ================= HERO ================= */}
      <section className="bg-indigo-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center min-h-162.5 py-16">

            {/* Hero Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 rounded-full px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                New arrivals are here
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mt-7">
                Shop smarter.
                <span className="block text-indigo-600">
                  Live better.
                </span>
              </h1>

              <p className="mt-6 text-gray-600 text-lg leading-8 max-w-xl">
                Discover trending products, unbeatable prices, and everything
                you need — all in one place.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                >
                  Start Shopping
                  <span className="ml-2">→</span>
                </Link>

                <Link
                  to="/categories"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-white border border-gray-200 text-gray-900 font-semibold hover:border-indigo-300 hover:text-indigo-600 transition"
                >
                  Explore Categories
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-12">
                <div>
                  <p className="text-3xl font-bold">10K+</p>
                  <p className="text-sm text-gray-500 mt-1">Products</p>
                </div>

                <div className="w-px bg-gray-300"></div>

                <div>
                  <p className="text-3xl font-bold">5K+</p>
                  <p className="text-sm text-gray-500 mt-1">Customers</p>
                </div>

                <div className="w-px bg-gray-300"></div>

                <div>
                  <p className="text-3xl font-bold">4.8</p>
                  <p className="text-sm text-gray-500 mt-1">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-indigo-200 rounded-full blur-2xl opacity-70"></div>

              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-70"></div>

              <div className="relative rounded-4xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1000&q=85"
                  alt="Shopping collection"
                  className="w-full h-125 lg:h-145 object-cover"
                />

                {/* Floating Offer */}
                <div className="absolute top-6 right-6 bg-white rounded-2xl p-5 shadow-xl">
                  <p className="text-xs text-gray-500 font-medium">
                    TODAY'S OFFER
                  </p>
                  <p className="text-3xl font-black text-indigo-600 mt-1">
                    30%
                  </p>
                  <p className="text-sm font-semibold">OFF</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {benefits.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-xl">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-sm">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                Explore
              </p>

              <h2 className="text-3xl sm:text-4xl font-black mt-2">
                Shop by Category
              </h2>

              <p className="text-gray-500 mt-3">
                Find everything you need in one place.
              </p>
            </div>

            <Link
              to="/categories"
              className="hidden sm:block font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

            {categories.map((category) => (
              <Link
                to="/shop"
                key={category.name}
                className="group relative overflow-hidden rounded-2xl h-72 bg-gray-100"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"></div>

                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-xl font-bold">
                    {category.name}
                  </h3>

                  <p className="text-sm text-white/80 mt-1">
                    {category.count}
                  </p>

                  <span className="inline-block mt-3 text-sm font-semibold">
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* ================= FLASH SALE ================= */}
      <section className="bg-gray-950 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">

            <div>
              <div className="inline-flex items-center gap-2 text-indigo-400 text-sm font-bold">
                <span>⚡</span>
                LIMITED TIME
              </div>

              <h2 className="text-3xl sm:text-4xl font-black mt-2">
                Flash Sale
              </h2>

              <p className="text-gray-400 mt-2">
                Grab your favourites before they're gone.
              </p>
            </div>

            {/* Timer */}
            <div className="flex gap-2">
              <div className="bg-gray-800 rounded-xl px-4 py-3 text-center">
                <p className="text-xl font-bold">08</p>
                <p className="text-[10px] text-gray-400">HOURS</p>
              </div>

              <div className="text-xl font-bold pt-3">:</div>

              <div className="bg-gray-800 rounded-xl px-4 py-3 text-center">
                <p className="text-xl font-bold">42</p>
                <p className="text-[10px] text-gray-400">MIN</p>
              </div>

              <div className="text-xl font-bold pt-3">:</div>

              <div className="bg-gray-800 rounded-xl px-4 py-3 text-center">
                <p className="text-xl font-bold">18</p>
                <p className="text-[10px] text-gray-400">SEC</p>
              </div>
            </div>

          </div>

          {/* Product Grid */}


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
              />
            ))}
          </div>



        </div>
      </section>

      {/* ================= PROMO BANNER ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-4xl bg-indigo-600 px-8 py-14 sm:px-12 lg:px-16">

            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10"></div>

            <div className="absolute right-20 -bottom-32 w-72 h-72 rounded-full bg-white/10"></div>

            <div className="relative z-10 max-w-2xl">

              <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest">
                Special Weekend Offer
              </p>

              <h2 className="text-4xl sm:text-5xl font-black text-white mt-4 leading-tight">
                Upgrade your lifestyle
                <span className="block text-indigo-200">
                  without breaking the bank.
                </span>
              </h2>

              <p className="text-indigo-100 mt-5 max-w-lg">
                Enjoy exclusive discounts across electronics, fashion,
                home essentials and more.
              </p>

              <Link
                to="/deals"
                className="inline-flex items-center mt-7 bg-white text-indigo-600 px-7 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition"
              >
                Explore Deals →
              </Link>

            </div>
          </div>

        </div>
      </section>

      {/* ================= WHY ICART ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-12">

            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider">
              Why iCart?
            </p>

            <h2 className="text-3xl sm:text-4xl font-black mt-2">
              Built around your shopping experience
            </h2>

            <p className="text-gray-500 mt-4">
              From discovering products to getting them delivered,
              we keep everything simple.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-white p-7 rounded-2xl border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl">
                🎯
              </div>

              <h3 className="text-xl font-bold mt-5">
                Curated Products
              </h3>

              <p className="text-gray-500 mt-2 leading-6">
                Discover carefully selected products from different
                categories and brands.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl">
                💰
              </div>

              <h3 className="text-xl font-bold mt-5">
                Better Prices
              </h3>

              <p className="text-gray-500 mt-2 leading-6">
                Find competitive prices, regular discounts and
                exclusive deals.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl">
                ❤️
              </div>

              <h3 className="text-xl font-bold mt-5">
                Customer First
              </h3>

              <p className="text-gray-500 mt-2 leading-6">
                Your shopping experience matters to us from checkout
                to delivery.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">

          <div className="bg-gray-950 rounded-4xl px-6 py-12 sm:px-12">

            <div className="text-4xl">
              📩
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white mt-4">
              Don't miss the good stuff.
            </h2>

            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              Subscribe to get product launches, exclusive deals and
              special offers directly in your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mt-8">

              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 h-13 px-5 rounded-xl bg-white text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                className="h-13 px-7 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
              >
                Subscribe
              </button>

            </div>

            <p className="text-xs text-gray-500 mt-4">
              No spam. Unsubscribe anytime.
            </p>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;

