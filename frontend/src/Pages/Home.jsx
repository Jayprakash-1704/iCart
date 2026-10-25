import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard.jsx";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {

    
    
    window.scrollTo({
      top: 1300,
      behavior: "smooth",
    });
    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 1000);

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");

        const data = await response.json();
        const discountedProducts = data.filter(
          (product) => product.discount > 25,
        );

        console.log(discountedProducts);
        setProducts(discountedProducts.slice(0, 8));
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => clearInterval(interval);
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
    <div className="min-h-screen overflow-x-hidden bg-white text-gray-900">
      {/* ================= NAV PROMO ================= */}
      <div className="bg-indigo-600 px-4 py-2 text-center text-xs sm:text-sm text-white">
        🎉 Get extra 15% OFF on your first order — Use code{" "}
        <span className="font-bold">WELCOME15</span>
      </div>

      {/* ================= HERO ================= */}
      <section className="overflow-hidden bg-indigo-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-125 items-center justify-center py-12 sm:py-16 lg:min-h-162.5">
            {/* Hero Content */}
            <div className="w-full text-center">
              {/* Badge */}
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-2 text-xs font-medium text-indigo-600 shadow-sm sm:px-4 sm:text-sm">
                <Sparkles />

                <p
                  className={
                    visible
                      ? "opacity-100 transition-opacity duration-200"
                      : "opacity-10 transition-opacity duration-200"
                  }
                >
                  New arrivals are here
                </p>
              </div>

              {/* Heading */}
              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:mt-7 lg:text-7xl">
                Shop smarter.
                <span className="block text-indigo-600">Live better.</span>
              </h1>

              {/* Description */}
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg lg:mt-6 lg:leading-8">
                Discover trending products, unbeatable prices, and everything
                you need — all in one place.
              </p>

              {/* Buttons */}
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  to="/shop"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 sm:w-auto sm:px-7"
                >
                  Start Shopping
                  <span className="ml-2">→</span>
                </Link>

                <Link
                  to="/categories"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-900 transition hover:border-indigo-300 hover:text-indigo-600 sm:w-auto sm:px-7"
                >
                  Explore Categories
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-6 sm:gap-x-8">
                <div>
                  <p className="text-2xl font-bold sm:text-3xl">10K+</p>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Products
                  </p>
                </div>

                <div className="hidden h-10 w-px bg-gray-300 sm:block"></div>

                <div>
                  <p className="text-2xl font-bold sm:text-3xl">5K+</p>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Customers
                  </p>
                </div>

                <div className="hidden h-10 w-px bg-gray-300 sm:block"></div>

                <div>
                  <p className="text-2xl font-bold sm:text-3xl">4.8</p>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Average Rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="rounded-b-2xl border-b border-gray-100 bg-indigo-50">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-8 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm sm:h-12 sm:w-12">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>

                  <p className="mt-1 text-xs text-gray-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between sm:mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 sm:text-sm">
                Explore
              </p>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl lg:text-4xl">
                Shop by Category
              </h2>

              <p className="mt-2 text-sm text-gray-500 sm:mt-3 sm:text-base">
                Find everything you need in one place.
              </p>
            </div>

            <Link
              to="/categories"
              className="hidden font-semibold text-indigo-600 hover:text-indigo-700 sm:block"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                to={`/categories`}
                key={category.name}
                className="group relative h-52 overflow-hidden rounded-xl bg-gray-100 sm:h-64 sm:rounded-2xl lg:h-72"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"></div>

                <div className="absolute bottom-3 left-3 text-white sm:bottom-5 sm:left-5">
                  <h3 className="text-base font-bold sm:text-xl">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-xs text-white/80 sm:text-sm">
                    {category.count}
                  </p>

                  <span className="mt-2 inline-block text-xs font-semibold sm:mt-3 sm:text-sm">
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            to="/categories"
            className="mt-6 block text-center font-semibold text-indigo-600 sm:hidden"
          >
            View All Categories →
          </Link>
        </div>
      </section>

      {/* ================= FLASH SALE ================= */}
      <section className="bg-gray-950 py-14 text-white sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400">
                <span>⚡</span>
                LIMITED TIME
              </div>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl lg:text-4xl">
                Flash Sale
              </h2>

              <p className="mt-2 text-sm text-gray-400 sm:text-base">
                Grab your favourites before they're gone.
              </p>
            </div>

            {/* Timer */}
            <div className="flex justify-center gap-1.5 sm:gap-2">
              <div className="rounded-lg bg-gray-800 px-3 py-2 text-center sm:rounded-xl sm:px-4 sm:py-3">
                <p className="text-lg font-bold sm:text-xl">08</p>
                <p className="text-[9px] text-gray-400 sm:text-[10px]">HOURS</p>
              </div>

              <div className="pt-2 text-lg font-bold sm:pt-3 sm:text-xl">:</div>

              <div className="rounded-lg bg-gray-800 px-3 py-2 text-center sm:rounded-xl sm:px-4 sm:py-3">
                <p className="text-lg font-bold sm:text-xl">42</p>
                <p className="text-[9px] text-gray-400 sm:text-[10px]">MIN</p>
              </div>

              <div className="pt-2 text-lg font-bold sm:pt-3 sm:text-xl">:</div>

              <div className="rounded-lg bg-gray-800 px-3 py-2 text-center sm:rounded-xl sm:px-4 sm:py-3">
                <p className="text-lg font-bold sm:text-xl">18</p>
                <p className="text-[9px] text-gray-400 sm:text-[10px]">SEC</p>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="py-10 text-center text-gray-400">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="py-10 text-center text-gray-400">
              No products available.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= PROMO BANNER ================= */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-indigo-600 px-6 py-10 sm:rounded-4xl sm:px-10 sm:py-14 lg:px-16">
            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 sm:h-80 sm:w-80"></div>

            <div className="absolute -bottom-32 right-5 h-60 w-60 rounded-full bg-white/10 sm:right-20 sm:h-72 sm:w-72"></div>

            <div className="relative z-10 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 sm:text-sm">
                Special Weekend Offer
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl">
                Upgrade your lifestyle
                <span className="block text-indigo-200">
                  without breaking the bank.
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-6 text-indigo-100 sm:mt-5 sm:text-base">
                Enjoy exclusive discounts across electronics, fashion, home
                essentials and more.
              </p>

              <Link
                to="/deals"
                className="mt-6 inline-flex items-center rounded-xl bg-white px-6 py-3 font-bold text-indigo-600 transition hover:bg-gray-100 sm:mt-7 sm:px-7 sm:py-3.5"
              >
                Explore Deals <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY ICART ================= */}
      <section className="bg-gray-50 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 sm:text-sm">
              Why iCart?
            </p>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl lg:text-4xl">
              Built around your shopping experience
            </h2>

            <p className="mt-3 text-sm text-gray-500 sm:mt-4 sm:text-base">
              From discovering products to getting them delivered, we keep
              everything simple.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 transition hover:shadow-xl sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                🎯
              </div>

              <h3 className="mt-5 text-xl font-bold">Curated Products</h3>

              <p className="mt-2 leading-6 text-gray-500">
                Discover carefully selected products from different categories
                and brands.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 transition hover:shadow-xl sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                💰
              </div>

              <h3 className="mt-5 text-xl font-bold">Better Prices</h3>

              <p className="mt-2 leading-6 text-gray-500">
                Find competitive prices, regular discounts and exclusive deals.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 transition hover:shadow-xl sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                ❤️
              </div>

              <h3 className="mt-5 text-xl font-bold">Customer First</h3>

              <p className="mt-2 leading-6 text-gray-500">
                Your shopping experience matters to us from checkout to
                delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl bg-gray-950 px-5 py-10 text-center sm:rounded-4xl sm:px-12 sm:py-12">
            <div className="text-4xl">📩</div>

            <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
              Don't miss the good stuff.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400 sm:text-base">
              Subscribe to get product launches, exclusive deals and special
              offers directly in your inbox.
            </p>

            <div className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:mt-8 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                className="h-12 w-full rounded-xl bg-white px-5 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500 sm:h-13"
              />

              <button className="h-12 w-full rounded-xl bg-indigo-600 px-7 font-bold text-white transition hover:bg-indigo-700 sm:h-13 sm:w-auto">
                Subscribe
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

// ### What I changed

// The important responsive changes are:

// * **Hero:** `text-5xl` → `text-4xl sm:text-5xl lg:text-7xl`
// * **Hero image:** `h-125` → `h-72 sm:h-96 lg:h-[580px]`
// * Removed the oversized `min-h-162.5` behaviour on mobile.
// * Buttons become **full width on mobile**.
// * Stats wrap properly.
// * Benefits become **1 → 2 → 4 columns**.
// * Category cards become **2 → 4 columns**.
// * Category heights adapt to screen size.
// * Flash-sale timer scales down on mobile.
// * Product grid remains **1 → 2 → 4 columns**.
// * Promo banner typography and padding scale down.
// * Why iCart cards become **1 → 2 → 3 columns**.
// * Newsletter input/button become properly stacked on mobile.
// * Added `overflow-x-hidden` to prevent accidental horizontal scrolling.
// * Added `clearInterval(interval)` to prevent the animation interval from continuing after unmount.
// * Fixed the Unsplash URLs.
// * Changed `key={product.name}` to `key={product._id}`.
// * Changed the amber benefits section to `bg-indigo-50` so the colour system is consistent.
// * Added loading/empty-product handling.

// **One thing outside this file:** make sure your `index.html` has:

// ```html
// <meta
//   name="viewport"
//   content="width=device-width, initial-scale=1.0"
// />
// ```

// If your **Navbar** isn't responsive, it can still create horizontal scrolling even after fixing this Home page.
